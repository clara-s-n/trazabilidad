import { FastifyPluginAsync } from "fastify";

const vacunacionesRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.get('/:id_animal', {
        schema: {
        tags: ['Vacunaciones'],
        },
        handler: async (request, reply) => {
        // Logic to fetch vaccinations
        }
    });
    
    fastify.post('/', {
        schema: {
        tags: ['Vacunaciones'],
        },
        handler: async (request, reply) => {
        // Logic to create a new vaccination
        }
    });
};

export default vacunacionesRoute;
