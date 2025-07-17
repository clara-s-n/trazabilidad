import { FastifyPluginAsync } from "fastify";

const tokeneExample = Buffer.from(
    JSON.stringify({
        user: 'francisco@example.com',
        roles: ['user', 'admin'],
    })
).toString('base64');

const loginRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.post('/', {
        schema: {
            tags: ['Auth'],
            summary: 'Usuario Login',
            description: 'Endpoint para iniciar sesión de usuario',
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 }
                },
                required: ['email', 'password']
            }
        },
        handler: async (request, reply) => {
            // Logic to authenticate user and generate tokens
            // This is a placeholder for actual authentication logic
            if(tokeneExample) {
                // Simulate successful login
                const usuario = JSON.parse(Buffer.from(tokeneExample, 'base64').toString('utf-8'));
                return reply.send({
                    message: 'Login successful',
                    usuario,
                    exampleToken: tokeneExample // Example token for testing
                });
            }
        }
    });

    fastify.get('/profile', {
        schema: {
            tags: ['Auth'],
            summary: 'Get User Profile',
            description: 'Endpoint to retrieve the user profile information',
            security: [
                { bearerAuth: [] }
            ],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        email: { type: 'string', format: 'email' },
                        name: { type: 'string' },
                        roles: { type: 'array', items: { type: 'string' } }
                    },
                }
            }
        },

        onRequest: async (request, reply) => {
            const token = request.headers.authorization?.slice(7); // Remove 'Bearer ' prefix
            if (!token) {
                return reply.status(401).send({ message: 'Unauthorized' });
            }

            const usuario = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
            // You may want to validate usuario object here
            return reply.send({
                email: usuario.user,
                name: 'Francisco', // Example name, replace with real data
                roles: usuario.roles
            });
        },

        handler: async (request, reply) => {
            return request.user; // Assuming user is set in onRequest
        }
    });
};
export default loginRoute; 
