import { FastifyPluginAsync } from "fastify";
import { UserParams } from "../../../schemas/user.js";

const usuariosIdRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.put('/:user_id', {
    schema: {
      tags: ['Usuarios'],
      params: UserParams,
      description: 'Modificar un usuario',
      summary: 'Realizar la modificación de un usuario',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    handler: async (request, reply) => {
    // Handle updating usuario logic
    throw new Error("Not implemented");
  }
  });

  fastify.delete('/:user_id', {
    schema: {
      tags: ['Usuarios'],
      params: UserParams,
      description: 'Eliminar un usuario',
      summary: 'Realizar el eliminado de un usuario',
    },
    handler: async (request, reply) => {
      // Handle deleting usuario logic
      throw new Error("Not implemented");
    }
  });

  fastify.get('/:user_id', {
    schema: {
      tags: ['Usuarios'],
      params: UserParams,
      description: 'Obtener un usuario específico',
      summary: 'Obtener información detallada de un usuario específico',
    },
    handler: async (request, reply) => {
      // Handle fetching a specific usuario by ID logic
      throw new Error("Not implemented");
    }
  });
};

export default usuariosIdRoute;
