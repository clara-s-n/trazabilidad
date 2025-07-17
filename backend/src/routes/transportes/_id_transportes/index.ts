import { FastifyPluginAsync } from "fastify";

const transportesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/:id_transporte', {
    schema: {
      tags: ['Transportes'],
    },
    handler: async (request, reply) => {
      // Handle fetching transporte by ID logic
    },
  });
};

export default transportesRoutes;