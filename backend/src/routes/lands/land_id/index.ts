import { FastifyPluginAsync } from "fastify";
import { LandParams } from "../../../schemas/land.js";

const idPrediosRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/:id', {
    schema: {
      tags: ['Predios'],
      params: LandParams, 
      description: 'Obtener un predio específico',
      summary: 'Obtener información detallada de un predio específico',
    },
    handler: async (request, reply) => {
      // Handle fetching predio by ID logic
    },
  });

  fastify.put('/:id', {
    schema: {
      tags: ['Predios'],
    },
    handler: async (request, reply) => {
      // Handle updating predio by ID logic
    },
  });

  fastify.get('/:id/animals', {
    schema: {
      tags: ['Predios'],
      params: LandParams
    },
    handler: async (request, reply) => {
      // Handle fetching predio by ID logic
    },
  });
};

export default idPrediosRoute;
