import { FastifyPluginAsync } from "fastify";
import {
  TagParams,
  TagSchema,
  UpdateTagSchema,
  UpdateTagType,
} from "../../../types/schemas/tag.js";
import { tagRepository } from "../../../services/tag.repository.js";
import { UCUErrorNotFound } from "../../../utils/index.js";
import { animalRepository } from "../../../services/animal.repository.js";
import { Type } from "@sinclair/typebox";
import { AnimalParams } from "../../../types/schemas/animal.js";

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
          // Chequeamos si está asignada a algún animal
          const assignedAnimal = await tagRepository.getCurrentAnimalByTag(tag_id);
          // Si está asignada, no se puede desactivar
          if (assignedAnimal) {
            return reply
              .status(400)
              .send({
                message: `No se puede desactivar la tag porque está asignada al animal con ID ${assignedAnimal.id}.`,
              });
          }
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

  // Método para asignar una tag a un animal
  fastify.post(
    "/:tag_id/assign/:animal_id",
    {
      schema: {
        tags: ["Caravanas"],
        params: {
          type: "object",
          properties: {
            tag_id: { type: "string" },
            animal_id: { type: "string" },
          },
          required: ["tag_id", "animal_id"],
        },
        description: "Asignar una tag a un animal",
        summary: "Asignar tag",
        security: [{ bearerAuth: [] }],
        response: {
          200: { type: "null" },
          404: {
            type: "object",
            properties: { message: { type: "string" } },
          },
        },
      },
      onRequest: fastify.verifyOperatorOrAdmin,
      handler: async (request, reply) => {
        const { tag_id, animal_id } = request.params as { tag_id: string; animal_id: string };

        // Verifica que la tag exista
        const tag = await tagRepository.getTagById(tag_id);
        if (!tag) {
          throw new UCUErrorNotFound(`Tag con id=${tag_id} no encontrado`);
        }

        // Aquí deberías verificar que el animal exista (agrega tu lógica o repositorio)
        const animal = await animalRepository.getById(animal_id);
        if (!animal) {
          throw new UCUErrorNotFound(`Animal con id=${animal_id} no encontrado`);
        }

        // Asigna la tag al animal (implementa este método en tu repositorio)
        try {
            await tagRepository.assignTagToAnimal(animal_id, tag_id);
            return reply.status(200).send();
        } catch (e: any) {
            if (e.message === 'El animal ya tiene una caravana activa') {
                return reply.status(400).send({ message: e.message });
            }
            throw e;
        }
      },
    }
  );

  // Método para 
  fastify.put(
    ':tag_id/:animal_id',
    {
      schema: {
        tag: ['Caravanas'],
        params: Type.Intersect([TagParams, AnimalParams]),
        response: {
          200: Type.Object({
            success: Type.Boolean(),
            message: Type.String()
          }),
          404: Type.Object({
            success: Type.Boolean(),
            message: Type.String()
          }),
        }
      },
      handler: async (request, reply) => {
        const { animal_id, tag_id } = request.params as { animal_id: string; tag_id: string };
        const ok = await tagRepository.unassignTagFromAnimal(animal_id, tag_id);
        if (ok) {
          return { success: true, message: 'Tag desasignada correctamente.' };
        } else {
          reply.code(404);
          return { success: false, message: 'No se encontró la relación activa entre animal y tag.' };
        }
      }
    }
  );

  // Método para cambiarle la tag a un animal
  fastify.put(
    '/:tag_id/:animal_id/change',
    {
      schema: {
        tags: ['Caravanas'],
        params: Type.Intersect([TagParams, AnimalParams]),
        body: TagParams,
        description: 'Cambiar la tag de un animal',
        response: {
          200: Type.Object({
            success: Type.Boolean(),
            message: Type.String()
          }),
          404: Type.Object({
            success: Type.Boolean(),
            message: Type.String()
          }),
        }
      },
      handler: async (request, reply) => {
        const { animal_id, tag_id } = request.params as { animal_id: string; tag_id: string };
        const { tag_id: new_tag_id } = request.body as TagParams;
        const ok = await tagRepository.changeAnimalTag(animal_id, tag_id, new_tag_id);

        if (ok) {
          return { success: true, message: 'Tag cambiada correctamente.' };
        } else {
          reply.code(404);
          return { success: false, message: 'No se encontró la relación activa entre animal y tag.' };
        }
      }
    }
  );

  // Método para eliminar una tag de un animal
  fastify.delete(
    '/:tagId/:animalId',
    {
      schema: {
        tags: ['Caravanas'],
        params: Type.Intersect([TagParams, AnimalParams]),
        response: {
          200: Type.Object({
            success: Type.Boolean(),
            message: Type.String()
          }),
          404: Type.Object({
            success: Type.Boolean(),
            message: Type.String()
          }),
        }
      },
      handler: async (request, reply) => {
        const { animalId, tagId } = request.params as { animalId: string; tagId: string };
        const ok = await tagRepository.unassignTagFromAnimal(animalId, tagId);

        if (ok) {
          return { success: true, message: 'Tag desasignada correctamente.' };
        } else {
          reply.code(404);
          return { success: false, message: 'No se encontró la relación activa entre animal y tag.' };
        }
      }
    }
  );
}

export default idTagsRoute;