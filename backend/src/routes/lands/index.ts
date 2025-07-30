import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import {
  CreateLandParams,
  CreateLandType,
  LandParams,
  LandParamsType,
  LandSchema,
  UpdateLandParams,
  UpdateLandType,
} from "../..////types/schemas/land.js";
import { landRepository } from "../../services/land.repository.js";
import { UCUErrorBadRequest, UCUErrorNotFound } from "../../utils/index.js";
import { Animal } from "../../types/schemas/animal.js";
import websocket from "../../plugins/websocket.js";

const prediosRoute: FastifyPluginAsyncTypebox = async (fastify, opts) => {
  // 1. Listar todos los predios
  fastify.get("/", {
    schema: {
      tags: ["Predios"],
      summary: "Listar todos los predios",
      description:
        "Devuelve un array con todos los predios ordenados por nombre",
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(LandSchema),
      },
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const lands = await landRepository.getAllLands();
      return lands;
    },
    // wshandler: (socket: WebSocket, req) => {
    //   // ARREGLAR PARA LÓGICA.
    // },
  });

  // 2. Crear un nuevo predio
  fastify.register(async (fastify, opts): Promise<void> => {
    fastify.route({
      method: "POST",
      url: "/",
      schema: {
        tags: ["Predios"],
        summary: "Crear un nuevo predio",
        description:
          "Recibe name, latitude y longitude y devuelve el predio creado",
        security: [{ bearerAuth: [] }],
        body: CreateLandParams,
        response: {
          201: LandSchema,
        },
      },
      onRequest: fastify.verifyOperatorOrAdmin,
      handler: async (request, reply) => {
        const body = request.body as CreateLandType;
        const { name, latitude, longitude } = body;

        // Validación extra por si falta algo
        if (!name || latitude == null || longitude == null) {
          throw new UCUErrorBadRequest(
            "name, latitude y longitude son requeridos"
          );
        }

        const newLand = await landRepository.createLand({
          name,
          latitude,
          longitude,
        });

        reply.code(201);
        // Broadcast a TODOS los clientes WS conectados
        fastify.websocketServer.clients.forEach((cliente) => {
          if (cliente.readyState === WebSocket.OPEN) {
            cliente.send("newLand");
          }
        });

        return newLand;
      },
    });
  });

  // 3. GET /predios/:land_id
  fastify.get("/:land_id", {
    schema: {
      tags: ["Predios"],
      summary: "Obtener un predio específico",
      description: "Devuelve la información de un predio según su ID",
      params: LandParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: LandSchema,
      },
    },
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      const { land_id } = request.params as LandParamsType;
      const land = await landRepository.getLandById(land_id);
      if (!land) {
        throw new UCUErrorNotFound(`Predio ${land_id} no existe`);
      }
      return land;
    },
  });

  // 4. PUT /predios/:land_id
  fastify.put("/:land_id", {
    schema: {
      tags: ["Predios"],
      summary: "Modificar un predio",
      description: "Actualiza name, latitude y/o longitude de un predio",
      params: LandParams,
      body: UpdateLandParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: LandSchema,
      },
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
    },
  });

  // 5. GET /predios/:land_id/animals
  fastify.get("/:land_id/animals", {
    schema: {
      tags: ["Predios"],
      summary: "Listar animales en un predio",
      description: "Devuelve todos los animales asignados a un predio",
      params: LandParams,
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(Animal),
      },
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
      const animals = await landRepository.getAnimalsByLandId(land_id);
      return animals;
    },
  });

  // 6. DELETE /predios/:land_id
  fastify.delete("/:land_id", {
    schema: {
      tags: ["Predios"],
      summary: "Eliminar un predio",
      description: "Elimina un predio si no tiene animales asignados",
      params: LandParams,
      security: [{ bearerAuth: [] }],
      response: {
        // No hay contenido de respuesta
        204: Type.Null(),
      },
    },
    onRequest: fastify.verifyOperatorOrAdmin,
    handler: async (request, reply) => {
      const { land_id } = request.params as LandParamsType;

      // 1) Verificar que el predio exista
      const land = await landRepository.getLandById(land_id);
      if (!land) {
        throw new UCUErrorNotFound(`Predio ${land_id} no encontrado`);
      }

      // 2) Comprobar que no haya animales asignados
      const animals = await landRepository.getAnimalsByLandId(land_id);
      if (animals.length > 0) {
        throw new UCUErrorBadRequest(
          `No se puede eliminar el predio ${land_id} porque tiene ${animals.length} animal(es) asignado(s)`
        );
      }

      // 3) Eliminar el predio
      const deleted = await landRepository.deleteLand(land_id);
      if (!deleted) {
        // debería ser raro, pues ya comprobamos existencia
        throw new UCUErrorNotFound(`No se pudo eliminar el predio ${land_id}`);
      }

      // 4) Responder sin contenido
      reply.code(204).send();
    },
  });
};

export default prediosRoute;
