import { FastifyPluginAsync } from "fastify";

const caravanasRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(('/'), {
    schema: {
      tags: ['Caravanas'],
    },
    handler: async (request, reply) => {
      // Handle fetching caravans logic
    },
  });

  fastify.post(('/'), {
    schema: {
      tags: ['Caravanas'],
    },
    handler: async (request, reply) => {
      // Handle creating a new caravan logic
    },
  });
};

export default caravanasRoute;
