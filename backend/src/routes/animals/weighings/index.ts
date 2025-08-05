import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import {
  AnimalParams,
} from "../../../types/schemas/animal.js";
import {
  WeighingSchema,
  //CreateWeighingParams,
  //CreateWeighingType,
  CreateWeighingBody
} from "../../../types/schemas/weighing.js";
import { animalRepository } from "../../../services/animal.repository.js";
import { weighingRepository } from "../../../services/weighing.repository.js";
import { UCUErrorNotFound, UCUErrorBadRequest } from "../../../utils/index.js";
import { eventRepository } from "../../../services/event.repository.js";

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
      const animal = await animalRepository.getById(animal_id);
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
      body: CreateWeighingBody,
      security: [{ bearerAuth: [] }],
      response: {
        201: WeighingSchema
      }
    },
    onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const { animal_id } = request.params as AnimalParams;
      const payload = request.body as CreateWeighingBody;

      // Validar existencia del animal
      const animal = await animalRepository.getById(animal_id);

      if (!animal) {
        throw new UCUErrorNotFound(`Animal ${animal_id} no existe`);
      }

      // Crear evento asociado
      const { id: user_id } = request.user as { id: string };
      const event = await eventRepository.createEvent({
        event_type: 'Weighing',
        date: payload.date,
        comments: payload.comments,
        created_by: user_id,
      });

      await eventRepository.linkEventToAnimal(event.id, animal_id);

      // Crear pesaje
      const newWeighing = await weighingRepository.createWeighing({
        event_id: event.id,
        weight: payload.weight,
        unit: payload.unit,
      });

      if (!newWeighing) {
        throw new UCUErrorBadRequest("Error al crear el pesaje");
      }

      // Broadcast WebSocket message to all connected clients
      fastify.websocketServer.clients.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
          cliente.send("animals");
        }
      });

      reply.code(201);
      return newWeighing;
    }
  });
};

export default pesajesRoute;