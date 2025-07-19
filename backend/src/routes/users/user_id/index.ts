import { FastifyPluginAsync } from "fastify";
import { UserParams } from "../../../schemas/user.js";

const usuariosIdRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.put('/:user_id', {
    schema: {
      tags: ['Usuarios'],
      params: UserParams
    }
  }, async (request, reply) => {
    // Handle updating usuario logic
  });

  fastify.delete('/:user_id', {
    schema: {
      tags: ['Usuarios'],
      params: UserParams
    }
  }, async (request, reply) => {
    // Handle deleting usuario logic
  });

  fastify.get('/:user_id', {
    schema: {
      tags: ['Usuarios'],
      params: UserParams
    }
  }, async (request, reply) => {
    // Handle fetching a specific usuario by ID logic
  });
};

export default usuariosIdRoute;
