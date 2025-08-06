import { FastifyPluginAsync } from "fastify";
import { WebSocket } from "ws";
import { Type } from "@sinclair/typebox";

import {
  CreateVaccinationBody,
  //CreateVaccinationParams,
  //CreateVaccinationType,
  VaccinationSchema,
} from "../../../types/schemas/vaccination.js";

import { AnimalParams } from "../../../types/schemas/animal.js";
import { vaccinationRepository } from "../../../services/vaccination.repository.js";
import { animalRepository } from "../../../services/animal.repository.js";
import { UCUErrorNotFound, UCUErrorBadRequest } from "../../../utils/index.js";
import { eventRepository } from "../../../services/event.repository.js";

const vacunacionesRoute: FastifyPluginAsync = async (fastify) => {
  // 1) GET /:animal_id → listar todas las vacunaciones
  fastify.get("/:animal_id", {
    schema: {
      tags: ["Vacunaciones"],
      summary: "Listar vacunaciones de un animal",
      description: "Devuelve todas las vacunaciones asociadas al animal",
      params: AnimalParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(VaccinationSchema),
      },
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;

      // Validar existencia del animal
      const animal = await animalRepository.getById(animal_id);
      if (!animal) {
        throw new UCUErrorNotFound(`Animal ${animal_id} no existe`);
      }

      // Traer vacunaciones
      const vaccinations = await vaccinationRepository.getByAnimal(animal_id);

      // Broadcast WebSocket message to all connected clients
      fastify.websocketServer.clients.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
          cliente.send("animals");
        }
      });

      return vaccinations;
    },
  });

  // 2) POST /:animal_id → crear una vacunación
  fastify.post("/:animal_id", {
    schema: {
      tags: ["Vacunaciones"],
      summary: "Registrar una vacunación",
      description:
        "Crea una vacunación vinculada a un evento de vacunación del animal",
      params: AnimalParams,
      body: CreateVaccinationBody,
      security: [{ bearerAuth: [] }],
      response: {
        201: VaccinationSchema,
      },
    },
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const { id } = request.user as { id: string };
      const payload = request.body as CreateVaccinationBody;
      const event = await eventRepository.createEvent({
        event_type: "Vaccination",
        date: payload.date,
        comments: payload.comments,
        created_by: id,
      });

      await eventRepository.linkEventToAnimal(event.id, animal_id);

      const vac = await vaccinationRepository.createVaccination({
        event_id: event.id,
        vaccine: payload.vaccine,
        dosage: payload.dosage,
        provider: payload.provider,
      });

      if (!vac) {
        throw new UCUErrorBadRequest("Error al crear la vacunación");
      }

      // Broadcast WebSocket message to all connected clients
      fastify.websocketServer.clients.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
          cliente.send("animals");
        }
      });

      reply.code(201).send(vac);
    },
  });
};

export default vacunacionesRoute;
