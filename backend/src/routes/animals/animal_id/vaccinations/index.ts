import { FastifyPluginAsync } from "fastify";

const vacunacionesRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.get('/', {
        schema: {
        tags: ['Vacunaciones'],
        description: 'Listar todas las vacunaciones de un animal específico',
        summary: 'Obtener una lista de todas las vacunaciones para un animal específico',
        },
        handler: async (request, reply) => {
        // Logic to fetch vaccinations
        throw new Error("Not implemented");
        }
    });
    
    fastify.post('/', {
        schema: {
        tags: ['Vacunaciones'],
        description: 'Crear una nueva vacunación para un animal específico',
        summary: 'Agregar una nueva vacunación a la lista de un animal específico',
        },
        handler: async (request, reply) => {
        // Logic to create a new vaccination
        throw new Error("Not implemented");
        }
    });
};

export default vacunacionesRoute;
