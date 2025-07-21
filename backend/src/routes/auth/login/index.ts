// loginRoute.ts
import { UCUError } from "../../../utils/index.js";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { SignOptions } from "@fastify/jwt";
import { LoginParams, LoginType } from "../../../schemas/user.js";
import { userRepository } from "../../../services/user.repository.js";
import bcrypt from "bcryptjs";

const loginRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  fastify.post("/", {
    schema: {
      tags: ["Auth"],
      summary: "Usuario Login",
      description: "Endpoint para iniciar sesión de usuario",
      body: LoginParams,
      security: [],
      response: {
        200: ({
          token: String({ description: "JWT generado para autenticación" })
        })
      },
      example: [
        {
          email: "administrador@example.com",
          password: "admin123"
        },
        {
          email: "consulta@example.com",
          password: "consulta123"
        },
        {
          email: "operador@example.com",
          password: "operador123"
        }
      ]
    },
    handler: async (request, reply) => {
      const { email, password }: LoginType = request.body;

      if (!email || !password) {
        throw new UCUError("Email y contraseña son obligatorios");
      }

      const user = await userRepository.findUserByEmail(email);
      if (!user) {
        throw new UCUError("Usuario no encontrado");
      }

      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        throw new UCUError("Credenciales inválidas");
      }

      const payload = {
        user: user.email,
        roles: [user.rols_id] // Podés mapear esto si tenés más roles
      };

      const signOptions: SignOptions = {
        expiresIn: "1h",
        notBefore: "0"
      };

      const token = fastify.jwt.sign(payload, signOptions);
      return { token };
    }
  });
};

export default loginRoute;