import { FastifyPluginAsync } from "fastify";

const ventasRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.get('/', {
        schema: {
            tags: ['Ventas'],
            description: 'Listar todas las ventas de un animal específico',
            summary: 'Obtener una lista de todas las ventas para un animal específico',
        },
        handler: async (request, reply) => {
            // Logic to fetch sales
            throw new Error("Not implemented");
        }
    });

    fastify.post('/', {
        schema: {
            tags: ['Ventas'],
            description: 'Crear una nueva venta para un animal específico',
            summary: 'Agregar una nueva venta a la lista de un animal específico',
        },
        handler: async (request, reply) => {
            // Logic to create a new sale
            throw new Error("Not implemented");
        }
    });
};

export default ventasRoute;
