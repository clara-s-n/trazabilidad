import swagger, { FastifySwaggerOptions } from '@fastify/swagger'
import swaggerui from "@fastify/swagger-ui";
import fp from 'fastify-plugin'

export default fp<FastifySwaggerOptions>(async (fastify) => {
  await fastify.register(swagger,{
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Trazabilidad',
        description: 'API de Trazabilidad',
        version: '0.1.0'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
      tags: [
        { name: 'Auth', description: 'Endpoints para autenticación' }
        , { name: 'Animales', description: 'Endpoints para animales' }
        , { name: 'Usuarios', description: 'Endpoints para usuarios' }
        , { name: 'Transportes', description: 'Endpoints para transportes' }
        , { name: 'Caravanas', description: 'Endpoints para caravanas' }
        , { name: 'Predios', description: 'Endpoints para predios' }
        , { name: 'Ventas', description: 'Endpoints para ventas' }
        , { name: 'Vacunaciones', description: 'Endpoints para vacunaciones' }
        , { name: 'Pesajes', description: 'Endpoints para pesajes' }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      }
    }
  });

  await fastify.register(swaggerui, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })
})
