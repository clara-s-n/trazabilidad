import { FastifyPluginAsync } from "fastify";
import { TransportParams } from "../../../types/schemas/transport.js";

const transportesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/:transport_id', {
    schema: {
      tags: ['Transportes'],
      params: TransportParams,
      description: 'Obtener un transporte específico',
      summary: 'Obtener información detallada de un transporte específico',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      // Handle fetching transporte by ID logic
      throw new Error("Not implemented");
    },
  });

  fastify.put('/:transport_id', {
    schema: {
      tags: ['Transportes'],
      params: TransportParams,
      description: 'Modificar un transporte',
      summary: 'Realizar la modificación de un transporte',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      // Handle updating transporte by ID logic
      throw new Error("Not implemented");
    },
  });

  fastify.delete('/:transport_id', {
    schema: {
      tags: ['Transportes'],
      params: TransportParams,
      description: 'Eliminar un transporte',
      summary: 'Realizar la eliminación de un transporte',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      // Handle deleting transporte by ID logic
      throw new Error("Not implemented");
    },
  });
};

export default transportesRoutes;