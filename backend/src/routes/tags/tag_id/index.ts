import { FastifyPluginAsync } from "fastify";
import {
  TagParams,
  TagSchema,
  UpdateTagSchema,
  UpdateTagType,
} from "../../../types/schemas/tag.js";
import { tagRepository } from "../../../services/tag.repository.js";
import { UCUErrorNotFound } from "../../../utils/index.js";

const idTagsRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    "/:tag_id",
    {
      schema: {
        tags: ["Caravanas"],
        params: TagParams,
        description: "Obtener un tag específico por su ID",
        summary: "Detalles de un tag",
        security: [{ bearerAuth: [] }],
        response: {
          200: TagSchema,
          404: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
      onRequest: fastify.authenticate,
      handler: async (request, reply) => {
        const { tag_id } = request.params as TagParams;
        const tag = await tagRepository.getTagById(tag_id);
        if (!tag) {
          throw new UCUErrorNotFound(`Tag con id=${tag_id} no encontrado`);
        }
        return reply.status(200).send(tag);
      },
    }
  );

  fastify.put(
    "/:tag_id",
    {
      schema: {
        tags: ["Caravanas"],
        params: TagParams,
        body: UpdateTagSchema,
        description: "Desactivar (inactivate) un tag específico",
        summary: "Actualizar el status de un tag",
        security: [{ bearerAuth: [] }],
        response: {
          200: { type: "null" },
          400: {
            type: "object",
            properties: { message: { type: "string" } },
          },
        },
      },
      onRequest: fastify.verifyOperatorOrAdmin,
      handler: async (request, reply) => {
        const { tag_id } = request.params as TagParams;
        const payload = request.body as UpdateTagType;

        // Primero verificamos que el tag exista
        const existing = await tagRepository.getTagById(tag_id);
        if (!existing) {
          throw new UCUErrorNotFound(`Tag con id=${tag_id} no encontrado`);
        }

        // Solo permitimos desactivar (status='inactive')
        if (payload.status === "inactive") {
          await tagRepository.deactivateTag(tag_id);
          return reply.status(204).send();
        }

        return reply
          .status(400)
          .send({
            message:
              "Operación inválida. Solo se puede cambiar el status a 'inactive'.",
          });
      },
    }
  );
};

export default idTagsRoute;