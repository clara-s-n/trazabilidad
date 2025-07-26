import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import {
  CreateLandParams,
  CreateLandType,
  LandSchema
} from "../..////types/schemas/land.js";
import { landRepository } from "../../services/land.repository.js";
import {
  UCUErrorBadRequest} from "../../utils/index.js";

const prediosRoute: FastifyPluginAsyncTypebox = async (fastify, opts) => {
  // 1. Listar todos los predios
  fastify.get("/", {
    schema: {
      tags: ["Predios"],
      summary: "Listar todos los predios",
      description: "Devuelve un array con todos los predios ordenados por nombre",
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(LandSchema)
      }
    },
     onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const lands = await landRepository.getAllLands();
      return lands;
    }
  });

  // 2. Crear un nuevo predio
  fastify.post("/", {
    schema: {
      tags: ["Predios"],
      summary: "Crear un nuevo predio",
      description: "Recibe name, latitude y longitude y devuelve el predio creado",
      security: [{ bearerAuth: [] }],
      body: CreateLandParams,
      response: {
        201: LandSchema
      }
    },
     onRequest: fastify.verifyOperator,
    handler: async (request, reply) => {
      const body = request.body as CreateLandType;
      const { name, latitude, longitude } = body;

      // Validación extra por si falta algo
      if (!name || latitude == null || longitude == null) {
        throw new UCUErrorBadRequest("name, latitude y longitude son requeridos");
      }

      const newLand = await landRepository.createLand({ name, latitude, longitude });
      reply.code(201);
      return newLand;
    }
  });
};

export default prediosRoute;