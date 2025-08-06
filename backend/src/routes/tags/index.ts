import { FastifyPluginAsync } from "fastify";
import { WebSocket } from "ws";
import { tagRepository } from "../../services/tag.repository.js";
import { Type } from "@sinclair/typebox";
import { TagResponse } from "../../types/schemas/tag.js";
import { AnimalParams } from "../../types/schemas/animal.js";

const tagsRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["Caravanas"],
        description: "Listar todos los tags (caravanas electrónicas)",
        summary: "Obtener todos los tags",
        security: [{ bearerAuth: [] }],
        response: {
          200: Type.Array(TagResponse),
        },
      },
      onRequest: fastify.verifyOperatorOrAdmin,
      handler: async (request, reply) => {
        const tags = await tagRepository.getAllTags();

        // Broadcast WebSocket message to all connected clients
        fastify.websocketServer.clients.forEach((cliente) => {
          if (cliente.readyState === WebSocket.OPEN) {
            cliente.send("tags");
          }
        });

        return reply.status(200).send(tags);
      },
    }
  );

  fastify.get(
    '/:animal_id',{
      schema:{
        params: AnimalParams, 
        tags:['Caravanas']
      },
      handler: async (request, reply) => {
        const {animal_id} = request.params as AnimalParams;
        const tags = await tagRepository.getTagsByAnimal(animal_id);
        console.log('Historial de tags:', tags);

        // Broadcast WebSocket message to all connected clients
        fastify.websocketServer.clients.forEach((cliente) => {
          if (cliente.readyState === WebSocket.OPEN) {
            cliente.send("tags");
          }
        });

        return tags;
      }
    }
  )
};

export default tagsRoute;