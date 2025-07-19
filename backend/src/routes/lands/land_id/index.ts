import { FastifyPluginAsync } from "fastify";

const idPrediosRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/:id_predio', {
    schema: {
      tags: ['Predios'],
    },
    handler: async (request, reply) => {
      // Handle fetching predio by ID logic
    },
  });

  fastify.put('/:id_predio', {
    schema: {
      tags: ['Predios'],
    },
    handler: async (request, reply) => {
      // Handle updating predio by ID logic
    },
  });
};

export default idPrediosRoute;
