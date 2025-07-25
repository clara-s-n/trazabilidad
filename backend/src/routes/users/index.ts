import { FastifyPluginAsync } from "fastify";
import { UserPostSchema, UserPostType } from "../../types/schemas/user.js";
import { userRepository } from "../../services/user.repository.js";
import bcrypt from "bcryptjs";

const usuariosRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Usuarios'],
        description: 'Listar todos los usuarios',
        summary: 'Obtener una lista de todos los usuarios disponibles',
        security: [
          {
            bearerAuth: []
          }
        ],
      },
      onRequest: fastify.verifyAdmin,
      handler: async (request, reply) => {
        throw new Error("Not implemented");
      },
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Usuarios'],
        description: 'Crear un nuevo usuario',
        summary: 'Agregar un nuevo usuario a la lista',
        security: [
          {
            bearerAuth: []
          }
        ],
        body: UserPostSchema,
      },
      onRequest: fastify.verifyAdmin,
      handler: async (request, reply) => {
        // Obtenemos los datos del usuario desde el cuerpo de la solicitud
        const userData = request.body as UserPostType;
        // Hasheamos la contraseña antes de guardar
        const passwordHash = await bcrypt.hash(userData.password_hash, bcrypt.genSaltSync(10));
        // Creamos el usuario en la base de datos
        userData.password_hash = passwordHash;
        const user = await userRepository.createUser({
          ...userData
        });
        reply.status(201).send(user);
      },
    }
  );
};

export default usuariosRoute;
