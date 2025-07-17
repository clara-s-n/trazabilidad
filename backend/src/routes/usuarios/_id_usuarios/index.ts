import { FastifyPluginAsync } from "fastify";

const usuariosIdRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.put('/:id_usuario', {
    schema: {
      tags: ['Usuarios'],
    }
  }, async (request, reply) => {
    // Handle updating usuario logic
  });

  fastify.delete('/:id_usuario', {
    schema: {
      tags: ['Usuarios'],
    }
  }, async (request, reply) => {
    // Handle deleting usuario logic
  });

  fastify.get('/:id_usuario', {
    schema: {
      tags: ['Usuarios'],
    }
  }, async (request, reply) => {
    // Handle fetching a specific usuario by ID logic
  });
};

export default usuariosIdRoute;
