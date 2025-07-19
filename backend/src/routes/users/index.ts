import { FastifyPluginAsync } from "fastify";

const usuariosRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Usuarios'],
        description: 'Listar todos los usuarios',
        summary: 'Obtener una lista de todos los usuarios disponibles',
      },
      handler: async (request, reply) => {
        throw new Error("Not implemented");
      },
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Usuarios'],
        description: 'Crear un nuevo usuario',
        summary: 'Agregar un nuevo usuario a la lista',
      },
      handler: async (request, reply) => {
        throw new Error("Not implemented");
      },
    }
  );
};

export default usuariosRoute;
