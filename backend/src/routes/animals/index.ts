import { FastifyPluginAsync } from "fastify";
import { AnimalParams, AnimalSchema } from "../../types/schemas/animal.js";

const animalesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
    schema: {
      tags: ['Animales'],
      description: 'Listar todos los animales',
      summary: 'Obtener una lista de todos los animales disponibles',
      security: [
        {
          bearerAuth: []
        }
      ],
      response: {
        200: {
          description: 'Lista de animales',
          type: 'array',
          items: {
            type: 'object',
            properties: AnimalSchema.properties
          }
        }
      }
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      // Logic to fetch animals
      throw new Error("Not implemented")
    }
  });

  fastify.post('/', {
    schema: {
      tags: ['Animales'],
      description: 'Crear un nuevo animal',
      summary: 'Agregar un nuevo animal a la lista',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      // Logic to create a new animal
      throw new Error("Not implemented")
    }
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
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      // Handle fetching a specific animal by ID logic
      throw new Error("Not implemented")
    },
  });

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
    onRequest: fastify.verifyOperator,
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
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      // Handle deleting an animal logic
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
    onRequest: fastify.authenticate,
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
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      // Handle fetching a specific animal by ID logic
      throw new Error("Not implemented")
    },
  });
};

export default animalesRoute;
