import { FastifyPluginAsync } from "fastify";
import { AnimalParams } from "../../../types/schemas/animal.js";

const vacunacionesRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.get('/:animal_id', {
        schema: {
        tags: ['Vacunaciones'],
        params: AnimalParams,
        description: 'Listar todas las vacunaciones de un animal específico',
        summary: 'Obtener una lista de todas las vacunaciones para un animal específico',
        security: [
          {
            bearerAuth: []
          }
        ],
        },
        onRequest: fastify.authenticate,
        handler: async (request, reply) => {
        // Logic to fetch vaccinations
        throw new Error("Not implemented");
        }
    });
    
    fastify.post('/:animal_id', {
        schema: {
        tags: ['Vacunaciones'],
        params: AnimalParams,
        description: 'Crear una nueva vacunación para un animal específico',
        summary: 'Agregar una nueva vacunación a la lista de un animal específico',
        security: [
          {
            bearerAuth: []
          }
        ],
        },
        onRequest: fastify.verifyOperator,
        handler: async (request, reply) => {
        // Logic to create a new vaccination
        throw new Error("Not implemented");
        }
    });
};

export default vacunacionesRoute;
