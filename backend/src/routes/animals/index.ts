import { FastifyPluginAsync } from "fastify";
import { Animal, AnimalFilter, AnimalParams} from "../../types/schemas/animal.js";
import { animalRepository } from "../../services/animal.repository.js";

const animalesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
    schema: {
      tags: ['Animales'],
      description: 'Listar todos los animales',
      summary: 'Obtener una lista de todos los animales disponibles',
      querystring: AnimalFilter,
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
            properties: Animal.properties
          }
        }
      }
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      // Si la query viene vacía, se retornan todos los animales
      const filters = request.query as AnimalFilter;
      const list = await animalRepository.filter(filters);
      reply.send(list);
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
      body: Animal
    },
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const animalData = request.body as Animal;
      const newAnimal = await animalRepository.createAnimal(animalData);
      reply.status(201).send(newAnimal);
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
      response: {
        200: {
          description: 'Animal encontrado',
          type: 'object',
          properties: Animal.properties
        }
      }
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const animalId = request.params as string;
      const animal = await animalRepository.getByIdDetailed(animalId);
      if (!animal) {
        return reply.status(404).send({ message: 'Animal no encontrado' });
      }
      reply.send(animal);
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
