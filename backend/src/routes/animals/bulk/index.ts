import { FastifyPluginAsync } from "fastify";
import { WebSocket } from "ws";
import { Type } from "@sinclair/typebox";
import { animalRepository } from "../../../services/animal.repository.js";
import { UCUErrorBadRequest } from "../../../utils/index.js";
import { Animal } from "../../../types/schemas/animal.js";

// Bulk creation types
const BulkCreateAnimalSchema = Type.Array(
  Type.Object({
    breed: Type.String({ minLength: 1 }),
    birth_date: Type.String({ format: "date" }),
    owner_id: Type.String({ format: "uuid" }),
    land_id: Type.String({ format: "uuid" }),
    status: Type.Union([
      Type.Literal("alive"),
      Type.Literal("deceased"),
      Type.Literal("robbed"),
      Type.Literal("lost")
    ]),
    row_id: Type.Optional(Type.Number()) // For tracking which row had issues
  }),
  { minItems: 1, maxItems: 50 } // Limit to 50 animals per batch
);

// Bulk update types
const BulkUpdateAnimalSchema = Type.Object({
  animal_ids: Type.Array(Type.String({ format: "uuid" }), { minItems: 1, maxItems: 100 }),
  updates: Type.Object({
    breed: Type.Optional(Type.String()),
    owner_id: Type.Optional(Type.String({ format: "uuid" })),
    land_id: Type.Optional(Type.String({ format: "uuid" })),
    status: Type.Optional(Type.Union([
      Type.Literal("alive"),
      Type.Literal("deceased"),
      Type.Literal("robbed"),
      Type.Literal("lost")
    ]))
  })
});

// Response schemas
const BulkOperationResultSchema = Type.Object({
  success: Type.Boolean(),
  total_processed: Type.Number(),
  successful: Type.Number(),
  failed: Type.Number(),
  created_animals: Type.Optional(Type.Array(Animal)),
  updated_animals: Type.Optional(Type.Array(Animal)),
  errors: Type.Array(Type.Object({
    row_id: Type.Optional(Type.Number()),
    animal_id: Type.Optional(Type.String()),
    field: Type.Optional(Type.String()),
    message: Type.String(),
    code: Type.String()
  }))
});

const bulkRoute: FastifyPluginAsync = async (fastify) => {
  
  // Bulk create animals
  fastify.post("/create", {
    schema: {
      tags: ["Animales - Bulk"],
      summary: "Crear múltiples animales",
      description: "Crea hasta 50 animales en una sola operación. Procesa todas las entradas y reporta errores por fila.",
      security: [{ bearerAuth: [] }],
      body: BulkCreateAnimalSchema,
      response: {
        200: BulkOperationResultSchema,
        400: Type.Object({
          message: Type.String(),
          errors: Type.Optional(Type.Array(Type.Any()))
        })
      }
    },
    onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      const animalsData = request.body as Array<{
        breed: string;
        birth_date: string;
        owner_id: string;
        land_id: string;
        status: "alive" | "deceased" | "robbed" | "lost";
        row_id?: number;
      }>;

      const results = {
        success: true,
        total_processed: animalsData.length,
        successful: 0,
        failed: 0,
        created_animals: [] as any[],
        errors: [] as any[]
      };

      // Process each animal in a transaction-like manner
      for (let i = 0; i < animalsData.length; i++) {
        const animalData = animalsData[i];
        const rowId = animalData.row_id || i + 1;

        try {
          // Validate required fields with detailed error messages
          if (!animalData.breed?.trim()) {
            throw new Error("La raza es requerida y no puede estar vacía");
          }
          if (!animalData.birth_date) {
            throw new Error("La fecha de nacimiento es requerida");
          }
          if (!animalData.owner_id) {
            throw new Error("El propietario es requerido");
          }
          if (!animalData.land_id) {
            throw new Error("El predio es requerido");
          }

          // Validate date format
          const birthDate = new Date(animalData.birth_date);
          if (isNaN(birthDate.getTime())) {
            throw new Error("Formato de fecha de nacimiento inválido. Use YYYY-MM-DD");
          }

          // Validate future dates
          if (birthDate > new Date()) {
            throw new Error("La fecha de nacimiento no puede ser en el futuro");
          }

          // Validate very old dates (more than 30 years)
          const thirtyYearsAgo = new Date();
          thirtyYearsAgo.setFullYear(thirtyYearsAgo.getFullYear() - 30);
          if (birthDate < thirtyYearsAgo) {
            throw new Error("La fecha de nacimiento es demasiado antigua (más de 30 años)");
          }

          // Validate status
          const validStatuses = ["alive", "deceased", "robbed", "lost"];
          if (!validStatuses.includes(animalData.status)) {
            throw new Error(`Estado inválido. Debe ser uno de: ${validStatuses.join(", ")}`);
          }

          // TODO: Add validation for owner_id and land_id existence
          // This would require importing the respective repositories

          // Create the animal
          const newAnimal = await animalRepository.createAnimal({
            breed: animalData.breed.trim(),
            birth_date: animalData.birth_date,
            owner_id: animalData.owner_id,
            land_id: animalData.land_id,
            status: animalData.status || "alive"
          });

          results.created_animals.push(newAnimal);
          results.successful++;

        } catch (error: any) {
          results.failed++;
          
          // Determine which field caused the error
          let errorField = undefined;
          const errorMessage = error.message || "Error creating animal";
          
          if (errorMessage.toLowerCase().includes('raza')) {
            errorField = 'breed';
          } else if (errorMessage.toLowerCase().includes('fecha')) {
            errorField = 'birth_date';
          } else if (errorMessage.toLowerCase().includes('propietario')) {
            errorField = 'owner_id';
          } else if (errorMessage.toLowerCase().includes('predio')) {
            errorField = 'land_id';
          } else if (errorMessage.toLowerCase().includes('estado')) {
            errorField = 'status';
          }
          
          results.errors.push({
            row_id: rowId,
            field: errorField,
            message: errorMessage,
            code: "VALIDATION_ERROR"
          });
        }
      }

      // Update success status based on results
      results.success = results.failed === 0;

      // Broadcast WebSocket message to all connected clients
      if (results.successful > 0) {
        fastify.websocketServer.clients.forEach((cliente) => {
          if (cliente.readyState === WebSocket.OPEN) {
            cliente.send("animals");
          }
        });
      }

      reply.code(results.success ? 200 : 207).send(results); // 207 Multi-Status for partial success
    }
  });

  // Bulk update animals
  fastify.put("/update", {
    schema: {
      tags: ["Animales - Bulk"],
      summary: "Actualizar múltiples animales",
      description: "Actualiza campos compartidos en múltiples animales seleccionados.",
      security: [{ bearerAuth: [] }],
      body: BulkUpdateAnimalSchema,
      response: {
        200: BulkOperationResultSchema,
        400: Type.Object({
          message: Type.String(),
          errors: Type.Optional(Type.Array(Type.Any()))
        })
      }
    },
    onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      const { animal_ids, updates } = request.body as {
        animal_ids: string[];
        updates: {
          breed?: string;
          owner_id?: string;
          land_id?: string;
          status?: "alive" | "deceased" | "robbed" | "lost";
        };
      };

      // Validate that at least one update field is provided
      const updateFields = Object.keys(updates).filter(key => updates[key as keyof typeof updates] !== undefined);
      if (updateFields.length === 0) {
        throw new UCUErrorBadRequest("At least one update field must be provided");
      }

      const results = {
        success: true,
        total_processed: animal_ids.length,
        successful: 0,
        failed: 0,
        updated_animals: [] as any[],
        errors: [] as any[]
      };

      // Process each animal update
      for (const animalId of animal_ids) {
        try {
          // Check if animal exists
          const existingAnimal = await animalRepository.getById(animalId);
          if (!existingAnimal) {
            throw new Error("Animal not found");
          }

          // Update the animal
          const updatedAnimal = await animalRepository.updateAnimal(animalId, updates);
          if (!updatedAnimal) {
            throw new Error("Failed to update animal");
          }

          results.updated_animals.push(updatedAnimal);
          results.successful++;

        } catch (error: any) {
          results.failed++;
          results.errors.push({
            animal_id: animalId,
            message: error.message || "Error updating animal",
            code: "UPDATE_ERROR"
          });
        }
      }

      // Update success status
      results.success = results.failed === 0;

      // Broadcast WebSocket message to all connected clients
      if (results.successful > 0) {
        fastify.websocketServer.clients.forEach((cliente) => {
          if (cliente.readyState === WebSocket.OPEN) {
            cliente.send("animals");
          }
        });
      }

      reply.code(results.success ? 200 : 207).send(results);
    }
  });

  // Get validation info for bulk operations
  fastify.get("/validation-info", {
    schema: {
      tags: ["Animales - Bulk"],
      summary: "Obtener información para validación bulk",
      description: "Retorna listas de usuarios, predios y estados válidos para operaciones bulk.",
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Object({
          owners: Type.Array(Type.Object({
            id: Type.String(),
            email: Type.String()
          })),
          lands: Type.Array(Type.Object({
            id: Type.String(),
            name: Type.String()
          })),
          statuses: Type.Array(Type.Object({
            key: Type.String(),
            label_es: Type.String(),
            label_en: Type.String()
          })),
          breeds: Type.Array(Type.String())
        })
      }
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      // Import repositories
      const { userRepository } = await import("../../../services/user.repository.js");
      const { landRepository } = await import("../../../services/land.repository.js");
      
      const [users, lands, statuses] = await Promise.all([
        userRepository.getAllUsers(),
        landRepository.getAllLands(),
        animalRepository.getAnimalStatuses()
      ]);

      reply.send({
        owners: users.map(user => ({ id: user.id, email: user.email })),
        lands: lands.map(land => ({ id: land.id, name: land.name })),
        statuses,
        breeds: ["Holstein", "Jersey", "Angus", "Hereford", "Charolais", "Aberdeen Angus", "Holando", "Braford"]
      });
    }
  });
};

export default bulkRoute;
