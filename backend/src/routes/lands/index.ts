import { FastifyPluginAsync } from "fastify";

const prediosRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
    schema: {
      tags: ['Predios'],
      description: 'Listar todos los predios',
      summary: 'Obtener una lista de todos los predios disponibles',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    handler: async (request, reply) => {
      // Handle fetching predios logic
      throw new Error("Not implemented");
    },
  });

  fastify.post('/', {
    schema: {
      tags: ['Predios'],
      description: 'Crear un nuevo predio',
      summary: 'Agregar un nuevo predio a la lista',
    },
    handler: async (request, reply) => {
      // Handle creating a new predio logic
      throw new Error("Not implemented");
    },
  });
};

export default prediosRoute;
