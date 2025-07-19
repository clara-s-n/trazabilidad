import { FastifyPluginAsync } from "fastify";

const pesajesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/:id_animal', {
    schema: {
      tags: ['Pesajes'],
      description: 'Listar todos los pesajes de un animal específico',
      summary: 'Obtener una lista de todos los pesajes para un animal específico',
    },
    handler: async (request, reply) => {
      // Logic to fetch pesajes for the specified animal
      throw new Error("Not implemented");
    }
  });

  fastify.post('/', {
    schema: {
      tags: ['Pesajes'],
      description: 'Crear un nuevo pesaje para un animal específico',
      summary: 'Agregar un nuevo pesaje a la lista de un animal específico',
    },
    handler: async (request, reply) => {
      // Logic to create a new pesaje for the specified animal
      throw new Error("Not implemented");
    }
  });
};

export default pesajesRoute;
