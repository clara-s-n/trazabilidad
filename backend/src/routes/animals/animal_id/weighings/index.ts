import { FastifyPluginAsync } from "fastify";

const pesajesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/:id_animal', {
    schema: {
      tags: ['Pesajes'],
    },
    handler: async (request, reply) => {
      // Logic to fetch pesajes for the specified animal
    }
  });

  fastify.post('/', {
    schema: {
      tags: ['Pesajes'],
    },
    handler: async (request, reply) => {
      // Logic to create a new pesaje for the specified animal
    }
  });
};

export default pesajesRoute;
