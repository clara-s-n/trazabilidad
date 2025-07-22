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

  const authenticate: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
    const url = request.routeOptions.url;
    if(url === '/auth/login') {
      return;
    }
    await request.jwtVerify();
  };

  fastify.decorate("authenticate", authenticate);

  const verifyAdmin: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      const { id } = request.user as { id: string };
      const { rows } = await query(`SELECT role FROM users WHERE id = ${id}`);
      const role = rows[0].role;
      if (role !== 'Administrador') {
        reply.code(401).send({ error: `Unauthorized, you must be an admin and you are ${role}` });
      }
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  }

  fastify.decorate("verifyAdmin", verifyAdmin);

  const verifySelfOrAdmin: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
    try{
      await request.jwtVerify();
      const { id: userId } = request.params as { id: string };
      const { id } = request.user as { id: number };
      const { rows } = await query(`SELECT role FROM users WHERE id = ${id}`);
      const role = rows[0].role;
      if (role === 'admin' || id === Number(userId)) {
        return;
      }
    } catch (err) {
      reply.code(401).send({error: 'Unauthorized'})
    }
  }

  fastify.decorate("verifySelfOrAdmin", verifySelfOrAdmin);
});
export default jwtPlugin;
