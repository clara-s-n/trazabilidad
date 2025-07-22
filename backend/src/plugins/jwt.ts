import fp from 'fastify-plugin'
import jwt, { FastifyJWTOptions } from '@fastify/jwt'
import { UCUError } from '../utils/index.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import authenticateFunction from "../types/fastify.js";
import {query} from "../services/database.js";

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
    const { userId } = request.user as { userId: string };
    const { rows } = await query(
      'SELECT name FROM rols WHERE id = $1',
      [userId]
    );
    if (!rows.length || rows[0].name !== 'Administrador') {
      return reply.code(403).send({ error: 'Forbidden: Admins only' });
    }
  };

  // --- 3) Sólo Operador Autorizado puede pasar ---
  const verifyOperator: authenticateFunction = async (request, reply) => {
    await request.jwtVerify();
    const { userId } = request.user as { userId: string };
    const { rows } = await query(
      'SELECT name FROM rols WHERE id = $1',
      [userId]
    );
    if (!rows.length || rows[0].name !== 'Operador Autorizado') {
      return reply.code(403).send({ error: 'Forbidden: Operator only' });
    }
  };

  // --- 4) Operador o Admin puede pasar ---
  const verifyOperatorOrAdmin: authenticateFunction = async (request, reply) => {
    await request.jwtVerify();
    const { userId } = request.user as { userId: string };
    const { rows } = await query(
      'SELECT name FROM rols WHERE id = $1',
      [userId]
    );
    const role = rows[0]?.name;
    if (role !== 'Operador Autorizado' && role !== 'Administrador') {
      return reply.code(403).send({ error: 'Forbidden: Operator or Admin only' });
    }
  };

  // --- 5) El propio usuario o un Admin ---
  const verifySelfOrAdmin: authenticateFunction = async (request, reply) => {
    await request.jwtVerify();
    const { user_id: targetId } = request.params as { user_id: string };
    const { userId } = request.user as { userId: string };
    if (userId === targetId) {
      return; // es el mismo usuario
    }
    // si no, compruebo si es admin
    const { rows } = await query(
      'SELECT name FROM rols WHERE id = $1',
      [userId]
    );
    if (!rows.length || rows[0].name !== 'Administrador') {
      return reply.code(403).send({ error: 'Forbidden' });
    }
  };

  // Registrar los métodos de autenticación
  fastify.decorate("authenticate", authenticate);
  fastify.decorate("verifyAdmin", verifyAdmin);
  fastify.decorate("verifyOperator", verifyOperator);
  fastify.decorate("verifyOperatorOrAdmin", verifyOperatorOrAdmin);
  fastify.decorate("verifySelfOrAdmin", verifySelfOrAdmin);
});
export default jwtPlugin;
