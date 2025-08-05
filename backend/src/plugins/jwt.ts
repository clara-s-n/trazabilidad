import fp from 'fastify-plugin'
import jwt, { FastifyJWTOptions } from '@fastify/jwt'
import { UCUError } from '../utils/index.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import authenticateFunction from "../types/fastify.js";

const jwtOptions: FastifyJWTOptions = {
  secret: process.env.FASTIFY_SECRET || '',
};

const jwtPlugin = fp<FastifyJWTOptions>(async (fastify) => {  
  if (!jwtOptions.secret) {
    throw new UCUError("There's not a JWT secret");
  }

  fastify.register(jwt, jwtOptions);

  // Verificar el token JWT en cada solicitud
  const authenticate: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
    const url = request.routeOptions.url;
    if(url === '/auth/login') {
      return;
    }
    await request.jwtVerify();
  };


  // --- 2) Sólo Admin puede pasar ---
  const verifyAdmin: authenticateFunction = async (request, reply) => {
    await request.jwtVerify();
    const { id, role_id } = request.user as { id: string, role_id: number };

    if (role_id !== 3) {
      return reply.code(403).send({
        error: `Forbidden: Admin only, role: ${role_id}, info: ${id}`
      });
    }
  };

  // --- 3) Sólo Operador Autorizado puede pasar ---
  const verifyOperator: authenticateFunction = async (request, reply) => {
    await request.jwtVerify();

    const { id, role_id } = request.user as { id: string, role_id: number };

    if (role_id !== 1) {
      return reply.code(403).send({
        error: `Forbidden: Operator only, role: ${role_id}, info: ${id}`
      });
    }
  };

  // --- 4) Operador o Admin puede pasar ---
  const verifyOperatorOrAdmin: authenticateFunction = async (request, reply) => {
    await request.jwtVerify();

    const { id, role_id } = request.user as { id: string, role_id: number }

    if (role_id == 2) {
      return reply.code(403).send({
        error: `Forbidden: Operator or Admin only, role: ${role_id}, info: ${id}`
      });
    }
  };

  // --- 5) El propio usuario o un Admin ---
  const verifySelfOrAdmin: authenticateFunction = async (request, reply) => {
    await request.jwtVerify();
    const { user_id: targetId } = request.params as { user_id: string };
    const user = request.user as any;
    // Intenta obtener el ID desde varias posibles propiedades
    const userId = user.id || user.user_id; 
    const { role_id } = user;

    console.log('JWT verify - User data:', { userId, role_id, targetId, user });
    
    // Si es el mismo usuario, permitir acceso
    if (userId === targetId) {
      return; 
    }
    
    // Si es admin, permitir acceso
    if (role_id === 3) {
      return;
    }
    
    // Si no es ni el mismo usuario ni admin, denegar acceso
    return reply.code(403).send({
      error: `Forbidden: Admin or Owner only, user_id: ${userId}, target: ${targetId}`
    });
  };

  // --- 6) Operador (solo sus propios recursos) o Admin (cualquier recurso) ---
  const verifyOperatorSelfOrAdmin: authenticateFunction = async (request, reply) => {
    try {
      await request.jwtVerify();
      
      const { userId } = request.params as { userId: string };
      const { id, role_id } = request.user as { id: string, role_id: number };
      
      // Si es admin, permitir acceso a cualquier recurso
      if (role_id === 3) {
        return;
      }
      
      // Si es operador y accede a sus propios recursos, permitir
      if (role_id === 1 && id === userId) {
        return;
      }
      
      // En cualquier otro caso (operador intentando acceder a otro usuario o rol diferente)
      return reply.code(403).send({
        error: `Forbidden: Admin or self-operator only, user_id: ${id}, target: ${userId}, role: ${role_id}`
      });
    } catch (err) {
      // Error de JWT inválido o expirado genera 401 Unauthorized
      return reply.code(401).send({
        error: "Unauthorized: Invalid or expired token"
      });
    }
  };

  // Registrar los métodos de autenticación
  fastify.decorate("authenticate", authenticate);
  fastify.decorate("verifyAdmin", verifyAdmin);
  fastify.decorate("verifyOperator", verifyOperator);
  fastify.decorate("verifyOperatorOrAdmin", verifyOperatorOrAdmin);
  fastify.decorate("verifySelfOrAdmin", verifySelfOrAdmin);
  fastify.decorate("verifyOperatorSelfOrAdmin", verifyOperatorSelfOrAdmin);
});
export default jwtPlugin;
