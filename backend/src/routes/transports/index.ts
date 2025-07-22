import { FastifyPluginAsync } from "fastify";

const transportesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
    schema: {
      tags: ['Transportes'],
      description: 'Listar todos los transportes',
      summary: 'Obtener una lista de todos los transportes disponibles',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
        // Handle fetching transportes logic
        throw new Error("Not implemented");
    },
  });

  fastify.post('/', {
    schema: {
      tags: ['Transportes'],
      description: 'Crear un nuevo transporte',
      summary: 'Agregar un nuevo transporte a la lista',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
        // Handle creating new transporte logic
        throw new Error("Not implemented");
    },
  });  
};

export default transportesRoute;
