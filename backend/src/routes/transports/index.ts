// src/routes/transportes/index.ts
import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { transportRepository } from '../../services/transport.repository.js';
import {
  CreateTransportSchema,
  CreateTransportType,
  TransportSchema
} from '../../types/schemas/transport.js';

const transportesRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  // GET /transportes → listado completo
  fastify.get('/', {
    schema: {
      tags: ['Transportes'],
      summary: 'Listar todos los transportes',
      description: 'Obtiene el listado completo de transportes registrados',
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(TransportSchema)
      }
    },
    onRequest: fastify.authenticate,
    handler: async () => {
      // Asumiendo que implementás getAll() en transportRepository
      const result = await transportRepository.getAllTransports();
      return result;
    }
  });

  // POST /transportes → nuevo registro
  fastify.post('/', {
    schema: {
      tags: ['Transportes'],
      summary: 'Registrar un nuevo transporte',
      description: 'Crea un nuevo registro de transporte',
      body: CreateTransportSchema,
      security: [{ bearerAuth: [] }],
      response: {
        201: TransportSchema
      }
    },
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const data = request.body as CreateTransportType;
      const created = await transportRepository.createTransport(data);
      
      // Broadcast WebSocket message to all connected clients
      fastify.websocketServer.clients.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
          cliente.send("transports");
        }
      });
      
      reply.code(201);
      return created;
    }
  });
};

export default transportesRoute;