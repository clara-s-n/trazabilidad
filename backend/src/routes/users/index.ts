import { FastifyPluginAsync } from "fastify";
import { UserPostSchema, UserPostType, UserResponseSchema } from "../../types/schemas/user.js";
import { userRepository } from "../../services/user.repository.js";
import bcrypt from "bcryptjs";
import { Type } from "@sinclair/typebox";
import { UCUErrorBadRequest } from "../../utils/index.js";

const usuariosRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", {
    schema: {
      tags: ["Usuarios"],
      description: "Listar todos los usuarios",
      summary: "Obtener una lista de todos los usuarios disponibles",
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(UserResponseSchema)
      }
    },
    onRequest: fastify.verifyAdmin,
    handler: async (request, reply) => {
      const users = await userRepository.getAllUsers();
      const safeUsers = users.map(({ password_hash, ...u }) => u);
      reply.send(safeUsers);
    }
  });

  fastify.post("/", {
    schema: {
      tags: ["Usuarios"],
      description: "Crear un nuevo usuario",
      summary: "Agregar un nuevo usuario a la lista",
      security: [{ bearerAuth: [] }],
      body: UserPostSchema,
      response: {
        201: UserResponseSchema,
      }
    },
    onRequest: fastify.verifyAdmin,
    handler: async (request, reply) => {
      const { email, password, repeatPassword, role_id } = request.body as UserPostType;

      // 1. Verificar coincidencia de contraseñas
      if (password !== repeatPassword) {
        throw new UCUErrorBadRequest("Las contraseñas no coinciden");
      }

      // 2. Validar existencia de role_id
      const role = await userRepository.getRoleById(role_id);
      if (!role) {
        throw new UCUErrorBadRequest(`role_id ${role_id} no válido`);
      }

      // 3. Hashear contraseña y preparar payload
      const passwordHash = await bcrypt.hash(password, 10);
      const userToInsert = {
        email,
        password_hash: passwordHash,
        role_id,
      };

      const user = await userRepository.createUser(userToInsert);
      const { password_hash, ...safeUser } = user;

      reply.status(201).send(safeUser);
    }
  });
};

export default usuariosRoute;