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
    const { id, role_id } = request.user as { id: string, role_id: number };

    // Si es el mismo usuario, permitir acceso
    if (id === targetId) {
      return; 
    }
    
    // Si es admin, permitir acceso
    if (role_id === 3) {
      return;
    }
    
    // Si no es ni el mismo usuario ni admin, denegar acceso
    return reply.code(403).send({
      error: `Forbidden: Admin or Owner only, user_id: ${id}, target: ${targetId}`
    });
  };

  // Registrar los métodos de autenticación
  fastify.decorate("authenticate", authenticate);
  fastify.decorate("verifyAdmin", verifyAdmin);
  fastify.decorate("verifyOperator", verifyOperator);
  fastify.decorate("verifyOperatorOrAdmin", verifyOperatorOrAdmin);
  fastify.decorate("verifySelfOrAdmin", verifySelfOrAdmin);
});
export default jwtPlugin;
