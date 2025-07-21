import { FastifyPluginAsync } from "fastify";

const caravanasRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(('/'), {
    schema: {
      tags: ['Caravanas'],
      description: 'Listar todas las caravanas',
      summary: 'Obtener una lista de todas las caravanas disponibles',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    handler: async (request, reply) => {
      // Handle fetching caravans logic
      throw new Error("Not implemented");
    },
  });
};

export default caravanasRoute;
