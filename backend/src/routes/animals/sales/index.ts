import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { AnimalParams } from "../../../types/schemas/animal.js";
import { CreateSaleBody, /*CreateSaleParams, CreateSaleType,*/ SaleSchema } from "../../../types/schemas/sale.js";
import { saleRepository } from "../../../services/sale.repository.js";
import { animalRepository } from "../../../services/animal.repository.js";
import { UCUErrorNotFound, UCUErrorBadRequest } from "../../../utils/index.js";
import { eventRepository } from "../../../services/event.repository.js";

const ventasRoute: FastifyPluginAsyncTypebox = async (fastify) => {
    // GET /:animal_id → listar ventas
    fastify.get("/:animal_id", {
        schema: {
            tags: ["Ventas"],
            summary: "Listar ventas de un animal",
            description: "Devuelve todas las ventas asociadas al animal",
            params: AnimalParams,
            security: [{ bearerAuth: [] }],
            response: {
                200: Type.Array(SaleSchema)
            }
        },
        onRequest: fastify.authenticate,
        handler: async (request, reply) => {
            const { animal_id } = request.params as AnimalParams;

            // Verifico que el animal exista
            const exists = await animalRepository.getByIdDetailed(animal_id);
            if (!exists) {
                throw new UCUErrorNotFound(`Animal ${animal_id} no existe`);
            }

            // Traigo las ventas directamente
            const sales = await saleRepository.getByAnimal(animal_id);
            return sales;

        }
    });

    // POST /:animal_id → crear venta
    fastify.post("/:animal_id", {
        schema: {
            tags: ["Ventas"],
            summary: "Registrar una venta",
            description: "Crea una venta asociada a un evento existente del animal",
            params: AnimalParams,
            body: CreateSaleBody,
            security: [{ bearerAuth: [] }],
            response: {
                201: SaleSchema
            }
        },
        onRequest: fastify.verifyOperator,
        handler: async (request, reply) => {
            const { animal_id } = request.params as AnimalParams;
            const { id } = request.user as { id: string };
            const payload = request.body as CreateSaleBody;
            const event = await eventRepository.createEvent({
                event_type: 'Sale',
                date: payload.date,
                comments: payload.comments,
                created_by: id,
            });

            await eventRepository.linkEventToAnimal(event.id, animal_id);

            const sale = await saleRepository.createSale({
                event_id: event.id,
                buyer: payload.buyer,
                price: payload.price,
                currency: payload.currency,
            });

            if (!sale) {
                throw new UCUErrorBadRequest(`No se pudo crear la venta para el animal ${animal_id}`);
            }

            reply.code(201);
            return sale;
        }
    });
};

export default ventasRoute;