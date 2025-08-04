import { FastifyPluginAsync } from "fastify";
import {
  UpdateUserSchema,
  UpdateUserType,
  UserParams,
  UserParamsType,
  UserResponseSchema,
} from "../../../types/schemas/user.js";
import { userRepository } from "../../../services/user.repository.js";
import { UCUErrorNotFound } from "../../../utils/index.js";
import { animalRepository } from "../../../services/animal.repository.js";
import { Animal } from "../../../types/schemas/animal.js";

const usuariosIdRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/:user_id", {
    schema: {
      tags: ["Usuarios"],
      params: UserParams,
      description: "Obtener un usuario específico",
      summary: "Obtener información detallada de un usuario específico",
      security: [{ bearerAuth: [] }],
      response: {
        200: UserResponseSchema,
        404: { description: "Usuario no encontrado" },
      },
    },
    onRequest: fastify.verifySelfOrAdmin,
    handler: async (request, reply) => {
      const { user_id } = request.params as UserParamsType;
      const user = await userRepository.getUserById(user_id);
      if (!user) {
        throw new UCUErrorNotFound(`Usuario ${user_id} no encontrado`);
      }
      const { password_hash, ...safeUser } = user;
      return {
        ...safeUser,
        user_id: safeUser.id, // agrega user_id para el frontend
      };
    },
  });

  fastify.get("/:user_id/animals/", {
    schema: {
      tags: ["Usuarios"],
      params: UserParams,
      description: "Obtener todos los animales de un usuario específico",
      summary:
        "Obtener información detallada de todos los animales referenciados a un usuario específico",
      security: [{ bearerAuth: [] }],
      response: {
        200: Animal,
        404: { description: "Animales no encontrados" },
      },
    },
    onRequest: fastify.verifySelfOrAdmin,
    handler: async (request, reply) => {
      const { user_id } = request.params as UserParamsType;
      const userAnimalList = await animalRepository.getByOwner(user_id);
      if (!userAnimalList) {
        throw new UCUErrorNotFound(
          `Animales del usuario ${user_id} no encontrados.`
        );
      }
    },
  });

  fastify.put("/:user_id", {
    schema: {
      tags: ["Usuarios"],
      params: UserParams,
      description: "Modificar un usuario",
      summary: "Realizar la modificación de un usuario",
      security: [{ bearerAuth: [] }],
      body: UpdateUserSchema,
      response: {
        200: UserResponseSchema,
        404: { description: "Usuario no encontrado" },
      },
    },
    onRequest: fastify.verifyAdmin,
    handler: async (request, reply) => {
      const { user_id } = request.params as UserParamsType;
      const updateData = request.body as UpdateUserType;
      const updatedUser = await userRepository.updateUser(user_id, updateData);
      if (!updatedUser) {
        throw new UCUErrorNotFound(
          `No se pudo actualizar el usuario ${user_id}`
        );
      }
      const { password_hash, ...safeUser } = updatedUser;
      return safeUser;
    },
  });

  // DELETE /users/:user_id
  fastify.delete("/:user_id", {
    schema: {
      tags: ["Usuarios"],
      params: UserParams,
      description: "Eliminar un usuario",
      summary: "Realizar el eliminado de un usuario",
      security: [{ bearerAuth: [] }],
      response: {
        204: { type: "null" },
      },
    },
    onRequest: fastify.verifySelfOrAdmin,
    handler: async (request, reply) => {
      const { user_id } = request.params as UserParamsType;
      const user = await userRepository.getUserById(user_id);
      if (!user) {
        throw new UCUErrorNotFound(`Usuario ${user_id} no encontrado`);
      }
      await userRepository.deleteUser(user_id);
      reply.code(204).send();
    },
  });
};

export default usuariosIdRoute;
