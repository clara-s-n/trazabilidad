import { FastifyPluginAsync } from "fastify";

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
    },
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
    },
    handler: async (request, reply) => {
      // Logic to create a new animal
      throw new Error("Not implemented")
    }
  });
};

export default animalesRoute;
