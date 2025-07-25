import { FastifyPluginAsync } from "fastify";
import { Animal, AnimalPost } from "../../schemas/animal.js";
import { animalRepository } from "../../services/animal.repository.js";

const animalesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
    schema: {
      tags: ['Animales'],
      description: 'Listar todos los animales',
      summary: 'Obtener una lista de todos los animales disponibles',
      //querystring: AnimalFilter,
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
      //const filters = request.query as AnimalFilter;
      //const list = await animalRepository.filter(filters);
      const list = await animalRepository.getAll();
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
      body: AnimalPost,
    },
    // onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const animalData = request.body as AnimalPost;
      const newAnimal = await animalRepository.createAnimal(animalData);
      reply.status(201).send(newAnimal);
    }
  });
};

export default animalesRoute;
