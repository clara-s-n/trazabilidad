import { FastifyPluginAsync } from "fastify";
import { AnimalParams } from "../../../types/schemas/animal.js";
//import { UserParams } from "../../../../../schemas/user.js";
//import { Type } from "@sinclair/typebox";

const animalesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.put("/:animal_id", {
    schema: {
      tags: ["Animales"],
      //params: Type.Intersect([UserParams, AnimalParams])
      params: AnimalParams,
      description: 'Modificar un animal',
      summary: 'Realizar la modificación de un animal',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    handler: async (request, reply) => {
      // Handle updating an animal logic
      throw new Error("Not implemented");
    },
  });

  fastify.delete("/:animal_id", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      description: 'Eliminar un animal',
      summary: 'Realizar el eliminado de un animal',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    handler: async (request, reply) => {
      // Handle deleting an animal logic
        throw new Error("Not implemented")
    },
  });

  fastify.get("/:animal_id", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      description: 'Listar un animal en específico',
      summary: 'Obtener un animal en específico.',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    handler: async (request, reply) => {
      // Handle fetching a specific animal by ID logic
      throw new Error("Not implemented")
    },
  });

  fastify.get("/:animal_id/modifications", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      summary: "Ver el historial de modificaciones realizadas a los datos de un animal",
      description: "Ver el historial de modificaciones realizadas a los datos de un animal",
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    handler: async (request, reply) => {
      // Handle fetching a specific animal by ID logic
      throw new Error("Not implemented")
    },
  });

  fastify.get("/:animal_id/events", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      summary: "Ver el historial de eventos de un animal",
      description: "Ver el historial de eventos de un animal",
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    handler: async (request, reply) => {
      // Handle fetching a specific animal by ID logic
      throw new Error("Not implemented")
    },
  });
};

export default animalesRoute;
