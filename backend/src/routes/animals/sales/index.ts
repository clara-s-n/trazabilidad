// src/routes/ventas/index.ts
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { AnimalParams } from "../../../types/schemas/animal.js";
import { CreateSaleParams, CreateSaleType, SaleSchema } from "../../../types/schemas/sale.js";
import { saleRepository } from "../../../services/sale.repository.js";
import { animalRepository } from "../../../services/animal.repository.js";
import { UCUErrorNotFound, UCUErrorBadRequest } from "../../../utils/index.js";

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
            body: CreateSaleParams,
            security: [{ bearerAuth: [] }],
            response: {
                201: SaleSchema
            }
        },
        onRequest: fastify.verifyOperator,
        handler: async (request, reply) => {
            const { animal_id } = request.params as AnimalParams;
            const body = request.body as CreateSaleType;

            const isValid = await saleRepository.getValidSaleEvent(animal_id, body.event_id);
            if (!isValid) {
                throw new UCUErrorBadRequest("El event_id no corresponde a una venta de este animal");
            }

            const animal = await animalRepository.getByIdDetailed(animal_id);
            console.log("EVENTOS DEL ANIMAL:", JSON.stringify(animal.events, null, 2));
            if (!animal) {
                throw new UCUErrorNotFound(`Animal ${animal_id} no existe`);
            }

            const ventaEvent = animal.events.find(e => e.id === body.event_id && e.type === "Sale");
            if (!ventaEvent) {
                throw new UCUErrorBadRequest(`El event_id ${body.event_id} no pertenece a una venta de este animal`);
            }
            const sale = await saleRepository.createSale(body);
            reply.code(201);
            return sale;
        }
    });
};

export default ventasRoute;