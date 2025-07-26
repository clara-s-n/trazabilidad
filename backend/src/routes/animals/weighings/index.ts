import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import {
  AnimalParams,
} from "../../../types/schemas/animal.js";
import {
  WeighingSchema,
  CreateWeighingParams,
  CreateWeighingType
} from "../../../types/schemas/weighing.js";
import { animalRepository } from "../../../services/animal.repository.js";
import { weighingRepository } from "../../../services/weighing.repository.js";
import { UCUErrorNotFound, UCUErrorBadRequest } from "../../../utils/index.js";

const pesajesRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  // GET /:animal_id → Listar pesajes
  fastify.get("/:animal_id", {
    schema: {
      tags: ["Pesajes"],
      summary: "Listar pesajes de un animal",
      description: "Devuelve todos los registros de pesajes para un animal",
      params: AnimalParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(WeighingSchema)
      }
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const animal = await animalRepository.getByIdDetailed(animal_id);
      if (!animal) {
        throw new UCUErrorNotFound(`Animal ${animal_id} no existe`);
      }
      return await weighingRepository.getByAnimal(animal_id);
    }
  });

  // POST /:animal_id → Crear pesaje
  fastify.post("/:animal_id", {
    schema: {
      tags: ["Pesajes"],
      summary: "Registrar un pesaje",
      description: "Crea un registro de pesaje vinculado al evento correspondiente",
      params: AnimalParams,
      body: CreateWeighingParams,
      security: [{ bearerAuth: [] }],
      response: {
        201: WeighingSchema
      }
    },
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const payload = request.body as CreateWeighingType;

      const valid = await weighingRepository.getValidWeighingEvent(
        animal_id,
        payload.event_id
      );
      if (!valid) {
        throw new UCUErrorBadRequest(
          `El event_id ${payload.event_id} no corresponde a un pesaje de este animal`
        );
      }

      const newWeighing = await weighingRepository.createWeighing(payload);
      reply.code(201);
      return newWeighing;
    }
  });
};

export default pesajesRoute;