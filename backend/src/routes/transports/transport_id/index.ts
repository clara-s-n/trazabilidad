import { FastifyPluginAsync } from "fastify";
import { TransportParams } from "../../../schemas/transport.js";

const transportesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/:transport_id', {
    schema: {
      tags: ['Transportes'],
      params: TransportParams
    },
    handler: async (request, reply) => {
      // Handle fetching transporte by ID logic
    },
  });
};

export default transportesRoutes;