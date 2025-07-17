import { FastifyPluginAsync } from "fastify";

const prediosRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
    schema: {
      tags: ['Predios'],
    },
    handler: async (request, reply) => {
      // Handle fetching predios logic
    },
  });

  fastify.post('/', {
    schema: {
      tags: ['Predios'],
    },
    handler: async (request, reply) => {
      // Handle creating a new predio logic
    },
  });
};

export default prediosRoute;
