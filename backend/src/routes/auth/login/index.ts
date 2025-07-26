import {
  UCUErrorNotFound,
  UCUErrorUnauthorized
} from "../../../utils/index.js";
import {
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { SignOptions } from "@fastify/jwt";
import { LoginParams, LoginType } from "../../../types/schemas/user.js";
import { LoginResponse } from "../../../types/schemas/user.js";
import { userRepository } from "../../../services/user.repository.js";
import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";

const loginRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  fastify.post("/", {
    schema: {
      tags: ["Auth"],
      summary: "Usuario Login",
      description: "Endpoint para iniciar sesión de usuario",
      body: LoginParams,
      security: [],
      response: {
        200: LoginResponse,
        401: { description: "Credenciales inválidas" },
        404: { description: "Usuario no encontrado" }
      }
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password }: LoginType = request.body as LoginType;

      if (!email || !password) {
        throw new UCUErrorUnauthorized("Email y contraseña son obligatorios");
      }

      const user = await userRepository.findUserByEmail(email);
      if (!user) {
        throw new UCUErrorNotFound("Usuario no encontrado");
      }

      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        throw new UCUErrorUnauthorized("Credenciales inválidas");
      }

      const tokenPayload = {
        user_id: user.id,
        role_id: user.role_id
      };

      const signOptions: SignOptions = {
        expiresIn: "1h",
        notBefore: "0"
      };

      const token = fastify.jwt.sign(tokenPayload, signOptions);

      // Omitir password_hash en respuesta
      const { password_hash, ...safeUser } = user;

      reply.send({
        token,
        user: safeUser
      });
    }
  });
};

export default loginRoute;