import { FastifyPluginAsync } from "fastify";
import { tagRepository } from "../../services/tag.repository.js";
import { Type } from "@sinclair/typebox";
import { TagSchema } from "../../types/schemas/tag.js";
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
        return tags;
      }
    }
  )
};

export default tagsRoute;