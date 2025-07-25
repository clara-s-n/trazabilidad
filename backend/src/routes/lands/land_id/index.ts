// src/routes/predios/idPrediosRoute.ts
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

import {
  LandParams,
  LandParamsType,
  UpdateLandParams,
  UpdateLandType,
  LandSchema
} from "../../../types/schemas/land.js";

import {
  Animal
} from "../../../types/schemas/animal.js";

import { landRepository } from "../../../services/land.repository.js";
import { animalRepository } from "../../../services/animal.repository.js";

import {
  UCUErrorNotFound,
  UCUErrorBadRequest
} from "../../../utils/index.js";

const idPrediosRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  // ——————————————————————————
  // 1) GET /predios/:land_id
  fastify.get("/:land_id", {
    schema: {
      tags: ["Predios"],
      summary: "Obtener un predio específico",
      description: "Devuelve la información de un predio según su ID",
      params: LandParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: LandSchema
      }
    },
    // onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      const { land_id } = request.params as LandParamsType;
      const land = await landRepository.getLandById(land_id);
      if (!land) {
        throw new UCUErrorNotFound(`Predio ${land_id} no existe`);
      }
      return land;
    }
  });

  // ——————————————————————————
  // 2) PUT /predios/:land_id
  fastify.put("/:land_id", {
    schema: {
      tags: ["Predios"],
      summary: "Modificar un predio",
      description: "Actualiza name, latitude y/o longitude de un predio",
      params: LandParams,
      body: UpdateLandParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: LandSchema
      }
    },
     onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      const { land_id } = request.params as LandParamsType;
      const updateData = request.body as UpdateLandType;

      // Al menos un campo debe ser provisto
      if (
        updateData.name === undefined &&
        updateData.latitude === undefined &&
        updateData.longitude === undefined
      ) {
        throw new UCUErrorBadRequest(
          "Debe enviar al menos name, latitude o longitude"
        );
      }

      const updated = await landRepository.updateLand(land_id, updateData);
      if (!updated) {
        throw new UCUErrorNotFound(
          `No se pudo actualizar: predio ${land_id} no encontrado`
        );
      }
      return updated;
    }
  });

  // ——————————————————————————
  // 3) GET /predios/:land_id/animals
  fastify.get("/:land_id/animals", {
    schema: {
      tags: ["Predios"],
      summary: "Listar animales en un predio",
      description: "Devuelve todos los animales asignados a un predio",
      params: LandParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(Animal)
      }
    },
     onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const { land_id } = request.params as LandParamsType;

      // 1) Verificar existencia del predio
      const land = await landRepository.getLandById(land_id);
      if (!land) {
        throw new UCUErrorNotFound(`Predio ${land_id} no encontrado`);
      }

      // 2) Recuperar animales por land_id
      //    Reutilizamos el método filter() para filtrar por landId
      const animals = await animalRepository.filter({ landId: land_id });
      return animals;
    }
  });
};

export default idPrediosRoute;