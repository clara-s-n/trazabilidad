import { FastifyPluginAsync } from "fastify";

const vacunacionesRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.get('/', {
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
