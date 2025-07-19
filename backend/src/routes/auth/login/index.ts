import { UCUError } from "../../../utils/index.js";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { SignOptions } from "@fastify/jwt";
import { LoginParams, LoginType } from "../../../schemas/usuario.js";

const loginRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
    fastify.post('/', {
        schema: {
            tags: ['Auth'],
            summary: 'Usuario Login',
            description: 'Endpoint para iniciar sesión de usuario',
            body: LoginParams,
            // Es lo mismo que el esquema de JSON Schema Ejemplo:
            // {
            //   "type": "object",
            //   "properties": {
            //     "email": { "type": "string", "format": "email" },
            //     "password": { "type": "string", "minLength": 6 }
            //   },
            //   "required": ["email", "password"]
            // }
        },
        handler: async (request, reply) => {
            const body: LoginType = request.body;

            if (!body.email || !body.password) {
                throw new UCUError('Email and password are required');
            }

            const payload = {
                user: body.email,
                roles: ['user', 'admin'],
            };

            const signOptions : SignOptions = {
                expiresIn: '1h', // Token expiration time
                notBefore: '3' // Token is valid immediately
            };

            const token = fastify.jwt.sign(payload, signOptions);
            return {token}; // Return the token and an example
        }
    });
};
export default loginRoute; 
