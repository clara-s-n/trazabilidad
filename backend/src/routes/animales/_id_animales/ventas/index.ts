import { FastifyPluginAsync } from "fastify";

const ventasRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.get('/', {
        schema: {
            tags: ['Ventas'],
        },
        handler: async (request, reply) => {
            // Logic to fetch sales
        }
    });

    fastify.post('/', {
        schema: {
            tags: ['Ventas'],
        },
        handler: async (request, reply) => {
            // Logic to create a new sale
        }
    });
};

export default ventasRoute;
