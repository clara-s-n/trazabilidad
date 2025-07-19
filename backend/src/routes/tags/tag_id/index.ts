import { FastifyPluginAsync } from "fastify";
import { TagParams } from "../../../schemas/tag.js";

const idCaravanasRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/:tag_id', {
    schema: {
      tags: ['Caravanas'],
      params: TagParams
    },
    handler: async (request, reply) => {
      // Handle fetching caravan by ID logic
    },
  });

  fastify.put('/:tag_id', {
    schema: {
      tags: ['Caravanas'],
      params: TagParams
    },
    handler: async (request, reply) => {
      // Handle updating caravan by ID logic
    },
  });
};

export default idCaravanasRoute;
