import { FastifyPluginAsync } from "fastify";
import { TagParams } from "../../../types/schemas/tag.js";

const idCaravanasRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/:tag_id', {
    schema: {
      tags: ['Caravanas'],
      params: TagParams,
      description: 'Obtener una caravana específica',
      summary: 'Obtener información detallada de una caravana específica',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      // Handle fetching caravan by ID logic
      throw new Error("Not implemented");
    },
  });

  fastify.put('/:tag_id', {
    schema: {
      tags: ['Caravanas'],
      params: TagParams,
      description: 'Modificar una caravana',
      summary: 'Realizar la modificación de una caravana',
    },
    onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      // Handle updating caravan by ID logic
      throw new Error("Not implemented");
    },
  });
};

export default idCaravanasRoute;
