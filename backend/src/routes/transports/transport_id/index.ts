// src/routes/transportes/id.ts
import { FastifyPluginAsync } from "fastify";
import { WebSocket } from "ws";
import {
  TransportParams,
  TransportSchema,
  UpdateTransportSchema,
  UpdateTransportType,
  TransportType,
} from "../../../types/schemas/transport.js";
import { transportRepository } from "../../../services/transport.repository.js";
import { UCUErrorNotFound } from "../../../utils/index.js";

const transportesRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /transportes/:transport_id
  fastify.get("/:transport_id", {
    schema: {
      tags: ["Transportes"],
      summary: "Obtener transporte por ID",
      description: "Devuelve los datos de un transporte específico",
      params: TransportParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: TransportSchema,
      },
    },
    onRequest: fastify.verifyOperator,
    handler: async (request) => {
      const { transport_id } = request.params as TransportType;
      const transport = await transportRepository.getTransportById(
        transport_id
      );
      if (!transport)
        throw new UCUErrorNotFound(`Transporte ${transport_id} no encontrado`);

      // Broadcast WebSocket message to all connected clients
      fastify.websocketServer.clients.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
          cliente.send("transports");
        }
      });

      return transport;
    },
  });

  // PUT /transportes/:transport_id
  fastify.put("/:transport_id", {
    schema: {
      tags: ["Transportes"],
      summary: "Actualizar transporte",
      description: "Modifica los datos de un transporte existente",
      params: TransportParams,
      body: UpdateTransportSchema,
      security: [{ bearerAuth: [] }],
      response: {
        200: TransportSchema,
      },
    },
    onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request) => {
      const { transport_id } = request.params as TransportType;
      const updates = request.body as UpdateTransportType;

      const updated = await transportRepository.updateTransport(
        transport_id,
        updates
      );
      if (!updated)
        throw new UCUErrorNotFound(
          `No se pudo modificar el transporte ${transport_id}`
        );

      // Broadcast WebSocket message to all connected clients
      fastify.websocketServer.clients.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
          cliente.send("transports");
        }
      });

      return updated;
    },
  });

  // DELETE /transportes/:transport_id
  fastify.delete("/:transport_id", {
    schema: {
      tags: ["Transportes"],
      summary: "Eliminar transporte",
      description: "Elimina definitivamente un registro de transporte",
      params: TransportParams,
      security: [{ bearerAuth: [] }],
      response: {
        204: { type: "null" },
      },
    },
    onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      const { transport_id } = request.params as TransportType;

      const exists = await transportRepository.getTransportById(transport_id);
      if (!exists)
        throw new UCUErrorNotFound(`Transporte ${transport_id} no encontrado`);

      await transportRepository.deleteTransport(transport_id);

      // Broadcast WebSocket message to all connected clients
      fastify.websocketServer.clients.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
          cliente.send("transports");
        }
      });

      reply.code(204).send();
    },
  });
};

export default transportesRoutes;
