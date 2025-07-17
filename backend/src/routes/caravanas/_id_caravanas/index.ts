import { FastifyPluginAsync } from "fastify";

const idCaravanasRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/:id', {
    schema: {
      tags: ['Caravanas'],
    },
    handler: async (request, reply) => {
      // Handle fetching caravan by ID logic
    },
  });

  fastify.put('/:id', {
    schema: {
      tags: ['Caravanas'],
    },
    handler: async (request, reply) => {
      // Handle updating caravan by ID logic
    },
  });
};

export default idCaravanasRoute;
