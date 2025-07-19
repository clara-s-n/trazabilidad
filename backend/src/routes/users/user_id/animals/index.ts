import { FastifyPluginAsync } from "fastify";

const animalesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
    schema: {
      tags: ['Animales'],
    },
    handler: async (request, reply) => {
      // Logic to fetch animals
    }
  });

  fastify.post('/', {
    schema: {
      tags: ['Animales'],
    },
    handler: async (request, reply) => {
      // Logic to create a new animal
    }
  });
};

export default animalesRoute;
