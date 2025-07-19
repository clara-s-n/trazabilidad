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
};

export default caravanasRoute;
