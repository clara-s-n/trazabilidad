import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

import {
  CreateVaccinationParams,
  CreateVaccinationType,
  VaccinationSchema
} from "../../../types/schemas/vaccination.js";

import { AnimalParams } from "../../../types/schemas/animal.js";
import { vaccinationRepository } from "../../../services/vaccination.repository.js";
import { animalRepository } from "../../../services/animal.repository.js";
import { UCUErrorNotFound, UCUErrorBadRequest } from "../../../utils/index.js";

const vacunacionesRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  // 1) GET /:animal_id → listar todas las vacunaciones
  fastify.get("/:animal_id", {
    schema: {
      tags: ["Vacunaciones"],
      summary: "Listar vacunaciones de un animal",
      description: "Devuelve todas las vacunaciones asociadas al animal",
      params: AnimalParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(VaccinationSchema)
      }
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;

      // Validar existencia del animal
      const animal = await animalRepository.getByIdDetailed(animal_id);
      if (!animal) {
        throw new UCUErrorNotFound(`Animal ${animal_id} no existe`);
      }

      // Traer vacunaciones
      const vacs = await vaccinationRepository.getByAnimal(animal_id);
      return vacs;
    }
  });

  // 2) POST /:animal_id → crear una vacunación
  fastify.post("/:animal_id", {
    schema: {
      tags: ["Vacunaciones"],
      summary: "Registrar una vacunación",
      description: "Crea una vacunación vinculada a un evento de vacunación del animal",
      params: AnimalParams,
      body: CreateVaccinationParams,
      security: [{ bearerAuth: [] }],
      response: {
        201: VaccinationSchema
      }
    },
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const payload = request.body as CreateVaccinationType;

      // Verificar que sea un evento válido para este animal
      const ok = await vaccinationRepository.getValidVaccinationEvent(
        animal_id,
        payload.event_id
      );
      if (!ok) {
        throw new UCUErrorBadRequest(
          `El event_id ${payload.event_id} no corresponde a vacunación de este animal`
        );
      }

      // Crear la nueva vacunación
      const vaccination = await vaccinationRepository.createVaccination(
        payload
      );
      reply.code(201);
      return vaccination;
    }
  });
};

export default vacunacionesRoute;