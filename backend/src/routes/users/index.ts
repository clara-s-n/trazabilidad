import { FastifyPluginAsync } from "fastify";

const usuariosRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Usuarios'],
      },
      handler: async (request, reply) => {
        reply.send({ message: 'Usuarios endpoint' });
      },
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Usuarios'],
      },
      handler: async (request, reply) => {
        reply.send({ message: 'Crear usuario' });
      },
    }
  );
};

export default usuariosRoute;
