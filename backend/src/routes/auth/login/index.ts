import { UCUError } from "../../../utils/index.js";
import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { SignOptions } from "@fastify/jwt";
import { LoginParams, LoginType } from "../../../schemas/user.js";

const loginRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  fastify.post("/", {
    schema: {
      tags: ["Auth"],
      summary: "Usuario Login",
      description: "Endpoint para iniciar sesión de usuario",
      body: LoginParams, 
      security: [],
      response: {
        200: Type.Object({
          token: Type.String({ description: "JWT generado para autenticación" })
        })
      }
    },
    handler: async (request, reply) => {
      const { email, password }: LoginType = request.body;

      if (!email || !password) {
        throw new UCUError("Email and password are required");
      }

      // Payload con roles de ejemplo
      const payload = {
        user: email,
        roles: ["user", "admin"]
      };

      const signOptions: SignOptions = {
        expiresIn: "1h", // Expira en una hora
        notBefore: "0" // Válido inmediatamente
      };

      const token = fastify.jwt.sign(payload, signOptions);
      return { token };
    }
  });
};

export default loginRoute;