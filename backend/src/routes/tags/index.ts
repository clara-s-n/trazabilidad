// src/routes/tags/tagsRoute.ts
import { FastifyPluginAsync } from "fastify";
import { tagRepository } from "../../services/tag.repository.js";
import { Type } from "@sinclair/typebox";
import { TagSchema } from "../../types/schemas/tag.js";

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
          200: Type.Array(TagSchema),
        },
      },
      onRequest: fastify.verifyOperatorOrAdmin,
      handler: async (request, reply) => {
        const tags = await tagRepository.getAllTags();
        return reply.status(200).send(tags);
      },
    }
  );
};

export default tagsRoute;