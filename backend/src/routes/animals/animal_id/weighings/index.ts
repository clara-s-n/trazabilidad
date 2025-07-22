import { FastifyPluginAsync } from "fastify";
import { AnimalParams } from "../../../../types/schemas/animal.js";

const pesajesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/:animal_id', {
    schema: {
      tags: ['Pesajes'],
      params: AnimalParams,
      description: 'Listar todos los pesajes de un animal específico',
      summary: 'Obtener una lista de todos los pesajes para un animal específico',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      // Logic to fetch pesajes for the specified animal
      throw new Error("Not implemented");
    }
  });

  fastify.post('/:animal_id', {
    schema: {
      tags: ['Pesajes'],
      params: AnimalParams,
      description: 'Crear un nuevo pesaje para un animal específico',
      summary: 'Agregar un nuevo pesaje a la lista de un animal específico',
      security: [
        {
          bearerAuth: []
        }
      ],
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      // Logic to create a new pesaje for the specified animal
      throw new Error("Not implemented");
    }
  });
};

export default pesajesRoute;
