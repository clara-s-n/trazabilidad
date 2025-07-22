import { FastifyPluginAsync } from "fastify";
import { AnimalParams } from "../../../../types/schemas/animal.js";

const ventasRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.get('/:animal_id', {
        schema: {
            tags: ['Ventas'],
            params: AnimalParams,
            description: 'Listar todas las ventas de un animal específico',
            summary: 'Obtener una lista de todas las ventas para un animal específico',
            security: [
            {
                bearerAuth: []
            }
            ],
        },
        handler: async (request, reply) => {
            // Logic to fetch sales
            throw new Error("Not implemented");
        }
    });

    fastify.post('/:animal_id', {
        schema: {
            tags: ['Ventas'],
            params: AnimalParams,
            description: 'Crear una nueva venta para un animal específico',
            summary: 'Agregar una nueva venta a la lista de un animal específico',
            security: [
            {
                bearerAuth: []
            }
            ],
        },
        handler: async (request, reply) => {
            // Logic to create a new sale
            throw new Error("Not implemented");
        }
    });
};

export default ventasRoute;
