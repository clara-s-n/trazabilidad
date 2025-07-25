// src/routes/usuarios/usuariosIdRoute.ts
import { FastifyPluginAsync } from "fastify";
import { UpdateUserSchema, UpdateUserType, UserParams, UserParamsType, UserSchema} from "../../../types/schemas/user.js";
import { userRepository } from "../../../services/user.repository.js";
import { UCUError } from "../../../utils/index.js";

const usuariosIdRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/:user_id", {
    schema: {
      tags: ["Usuarios"],
      params: UserParams,
      description: "Obtener un usuario específico",
      summary: "Obtener información detallada de un usuario específico",
      security: [{ bearerAuth: [] }],
      example: {
        params: {
          user_id: "debeeeb4-e4a4-4823-8510-b09ff13a735b"
        },
      },
      response: {
        200: {
          description: "Usuario encontrado",
          type: "object",
          properties: UserSchema.properties
        },
        404: {
          description: "Usuario no encontrado"
        }
      }
    },
    onRequest: fastify.verifySelfOrAdmin,
    handler: async (request, reply) => {
      const { user_id } = request.params as UserParamsType;
      const user = await userRepository.getUserById(user_id);
      if (!user) {
        throw new UCUError("Usuario no encontrado");
      }
      return user;
    }
  });

  fastify.put("/:user_id", {
    schema: {
      tags: ["Usuarios"],
      params: UserParams,
      description: "Modificar un usuario",
      summary: "Realizar la modificación de un usuario",
      security: [{ bearerAuth: [] }],
      body: UpdateUserSchema, 
    },
    onRequest: fastify.verifyAdmin,
    handler: async (request, reply) => {
      const { user_id } = request.params as UserParamsType;
      const updateData = request.body as UpdateUserType; // Asegurate de tener validaciones para el body

      const updatedUser = await userRepository.updateUser(user_id, updateData);
      if (!updatedUser) {
        throw new UCUError("No se pudo actualizar el usuario");
      }
      return updatedUser;
    }
  });

  fastify.delete("/:user_id", {
    schema: {
      tags: ["Usuarios"],
      params: UserParams,
      description: "Eliminar un usuario",
      summary: "Realizar el eliminado de un usuario",
      security: [{ bearerAuth: [] }]
    },
    onRequest: fastify.verifySelfOrAdmin,
    handler: async (request, reply) => {
      const { user_id } = request.params as UserParamsType;
      await userRepository.deleteUser(user_id);
      reply.code(204).send(); // Sin contenido
    }
  });
};

export default usuariosIdRoute;