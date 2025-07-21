import fp from 'fastify-plugin'
import jwt, { FastifyJWTOptions } from '@fastify/jwt'
import { UCUError } from '../utils/index.js';
import { FastifyReply, FastifyRequest } from 'fastify';


const jwtOptions: FastifyJWTOptions = {
  secret: process.env.FASTIFY_SECRET || '',
};

const jwtPlugin = fp<FastifyJWTOptions>(async (fastify) => {  
  if (!jwtOptions.secret) {
    throw new UCUError("There's not a JWT secret");
  }

  fastify.register(jwt, jwtOptions);

  fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    const url = request.routeOptions.url;
    if(url === '/auth/login') {
      return;
    }
    await request.jwtVerify();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default jwtPlugin;
//faltaba declarar el modulo y exportarlo.