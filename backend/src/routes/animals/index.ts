import { FastifyPluginAsync } from "fastify";
import {
  Animal,
  AnimalEventSchema,
  AnimalHistorySchema,
  AnimalParams,
  AnimalPost,
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
    onRequest: fastify.authenticate,
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
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const animalData = request.body as AnimalPost;
      const newAnimal = await animalRepository.createAnimal(animalData);
      reply.status(201).send(newAnimal);
    },
  });

  fastify.get("/:animal_id", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      description: "Listar un animal en específico",
      summary: "Obtener un animal en específico.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      response: {
        200: {
          description: "Animal encontrado",
          type: "object",
          properties: Animal.properties,
        },
      },
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const params = request.params as AnimalParams;
      const animal = await animalRepository.getByIdDetailed(params.animal_id);
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
    onRequest: fastify.verifyOperator,
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
        200: Type.Array(AnimalHistorySchema),
      },
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const modificationList = await animalRepository.getAnimalHistory(
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
};

export default animalesRoute;
