import { FastifyPluginAsync } from "fastify";
import {
  Animal,
  AnimalEventSchema,
  //AnimalHistorySchema,
  AnimalHistoryWithUserSchema,
  //AnimalMovementSchema,
  AnimalMovementWithLandsSchema,
  AnimalParams,
  AnimalPost,
  AnimalWithRelationsSchema,
  UpdateAnimalSchema,
  UpdateAnimalType,
} from "../../types/schemas/animal.js";
import { animalRepository } from "../../services/animal.repository.js";
import { UCUErrorNotFound } from "../../utils/index.js";
import { Type } from "@sinclair/typebox";

const animalesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/", {
    schema: {
      tags: ["Animales"],
      description: "Listar todos los animales",
      summary: "Obtener una lista de todos los animales disponibles",
      //querystring: AnimalFilter,
      security: [
        {
          bearerAuth: [],
        },
      ],
      response: {
        200: {
          description: "Lista de animales",
          type: "array",
          items: {
            type: "object",
            properties: Animal.properties,
          },
        },
      },
    },
    onRequest: fastify.authenticate, // All authenticated users can view animals
    handler: async (request, reply) => {
      // Si la query viene vacía, se retornan todos los animales
      //const filters = request.query as AnimalFilter;
      //const list = await animalRepository.filter(filters);
      const list = await animalRepository.getAll();
      reply.send(list);
    },
  });

  fastify.post("/", {
    schema: {
      tags: ["Animales"],
      description: "Crear un nuevo animal",
      summary: "Agregar un nuevo animal a la lista",
      security: [
        {
          bearerAuth: [],
        },
      ],
      body: AnimalPost,
    },
    onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      const animalData = request.body as AnimalPost;
      const newAnimal = await animalRepository.createAnimal(animalData);
      
      // Broadcast WebSocket message to all connected clients
      fastify.websocketServer.clients.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
          cliente.send("animals");
        }
      });
      
      reply.status(201).send(newAnimal);
    },
  });

  fastify.get("/:animal_id", {
  schema: {
    tags: ["Animales"],
    params: AnimalParams,
    description: "Obtener un animal con relaciones",
    summary: "Detalle de animal con propietario y predio",
    security: [{ bearerAuth: [] }],
    response: {
      200: AnimalWithRelationsSchema,
    },
  },
  onRequest: fastify.authenticate,
  handler: async (request, reply) => {
    const params = request.params as AnimalParams;
    const animal = await animalRepository.getByIdWithRelations(params.animal_id);
    if (!animal) {
      return reply.status(404).send({ message: "Animal no encontrado" });
    }
    reply.send(animal);
  },
  });

  fastify.put("/:animal_id", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      description: "Modificar un animal",
      summary: "Realizar la modificación de un animal",
      body: UpdateAnimalSchema,
      security: [
        {
          bearerAuth: [],
        },
      ],
      response: {
        200: Animal,
        404: { description: "Animal no encontrado" },
      },
    },
    onRequest: fastify.verifyOperatorOrAdmin, // Only operators and admins can edit
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const updateData = request.body as UpdateAnimalType;
      const updatedAnimal = await animalRepository.updateAnimal(
        animal_id,
        updateData
      );
      if (!updatedAnimal) {
        throw new UCUErrorNotFound(
          `No se pudo actualizar el animal ${animal_id}`
        );
      }
      
      // Broadcast WebSocket message to all connected clients
      fastify.websocketServer.clients.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
          cliente.send("animals");
        }
      });
      
      reply.send(updatedAnimal);
    },
  });

  // fastify.delete("/:animal_id", {
  //   schema: {
  //     tags: ["Animales"],
  //     params: AnimalParams,
  //     description: "Eliminar un animal",
  //     summary: "Realizar el eliminado de un animal",
  //     security: [
  //       {
  //         bearerAuth: [],
  //       },
  //     ],
  //   },
  //   onRequest: fastify.verifyOperator,
  //   handler: async (request, reply) => {
  //     // Handle deleting an animal logic
  //     throw new Error("Not implemented");
  //   },
  // });

  // No se usa pero nunca está demás tenerlo comentado (defensa).

  fastify.get("/:animal_id/modifications", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      summary:
        "Ver el historial de modificaciones realizadas a los datos de un animal",
      description:
        "Recupera todas las modificaciones hechas sobre los datos de un animal",
      security: [
        {
          bearerAuth: [],
        },
      ],
      response: {
        200: Type.Array(AnimalHistoryWithUserSchema),
      },
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const modificationList = await animalRepository.getHistoryByAnimalId(
        animal_id
      );
      reply.send(modificationList);
    },
  });

  fastify.get(
    "/:animal_id/events",
    {
      schema: {
        tags: ["Animales"],
        params: AnimalParams,
        summary: "Ver el historial de eventos de un animal",
        description:
          "Recupera todos los eventos asociados a un animal ordenados por fecha descendente.",
        security: [{ bearerAuth: [] }],
        response: {
          200: Type.Array(AnimalEventSchema),
        },
      },
      onRequest: fastify.authenticate,
    },
    async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const events = await animalRepository.getAnimalEvents(animal_id);
      return reply.code(200).send(events);
    }
  );
  fastify.get(
    "/:animal_id/movements",
    {
      schema: {
        tags: ["Animales"],
        params: AnimalParams,
        summary: "Ver el historial de movimientos de un animal",
        description:
          "Recupera todos los movimientos (traslados) asociados a un animal ordenados por fecha descendente.",
        security: [{ bearerAuth: [] }],
        response: {
          200: Type.Array(AnimalMovementWithLandsSchema),
        },
      },
      onRequest: fastify.authenticate,
    },
    async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const movements = await animalRepository.getTransportHistoryByAnimalId(animal_id);
      return reply.code(200).send(movements);
    }
  );

  // Ruta para obtener la caravana actual de un animal
  fastify.get("/:animal_id/current-tag", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      summary: "Obtener la caravana actual de un animal",
      description: "Recupera la caravana actual asociada a un animal.",
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Object({
          currentTag: Type.Object({
            id: Type.String(),
            tag_number: Type.String(),
            status: Type.String(),
            country_code: Type.String(),
            country_iso: Type.String(),
            ministry: Type.String(),
          }),
        }),
      },
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const currentTag = await animalRepository.getCurrentTag(animal_id);
      if (!currentTag) {
        return reply.status(404).send({ message: "Caravana no encontrada" });
      }
      return reply.code(200).send({ currentTag });
    },
  });

  fastify.get(
    "/statuses",
    {
      schema: {
        tags: ["Animales"],
        summary: "Obtener todos los estados posibles para animales",
        description: "Devuelve la lista de posibles estados para un animal",
        security: [{ bearerAuth: [] }],
        response: {
          200: Type.Array(
            Type.Object({
              key: Type.String(),
              label_es: Type.String(),
              label_en: Type.String(),
            })
          ),
        },
      },
      onRequest: fastify.authenticate,
      handler: async (request, reply) => {
        const statuses = await animalRepository.getAnimalStatuses();
        return reply.code(200).send(statuses);
      },
    }
  );
};

export default animalesRoute;
