import { FastifyPluginAsync } from "fastify";

const loginRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.post('/login', {
        schema: {
            tags: ['Auth'],
        },
        handler: async (request, reply) => {
            // Handle login logic here
        }
    });
};
export default loginRoute; 
