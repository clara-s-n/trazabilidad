import { FastifyPluginAsync } from "fastify";
import { TransportParams } from "../../../schemas/transport.js";

const transportesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/:transport_id', {
    schema: {
      tags: ['Transportes'],
      params: TransportParams,
      description: 'Obtener un transporte específico',
      summary: 'Obtener información detallada de un transporte específico',
    },
    handler: async (request, reply) => {
      // Handle fetching transporte by ID logic
      throw new Error("Not implemented");
    },
  });
};

export default transportesRoutes;