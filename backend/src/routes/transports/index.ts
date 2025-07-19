import { FastifyPluginAsync } from "fastify";

const transportesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
    schema: {
      tags: ['Transportes'],
    },
    handler: async (request, reply) => {
        // Handle fetching transportes logic
    },
  });

  fastify.post('/', {
    schema: {
      tags: ['Transportes'],
    },
    handler: async (request, reply) => {
        // Handle creating new transporte logic
    },
  });  
};

export default transportesRoute;
