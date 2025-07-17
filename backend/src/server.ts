import Fastify, { FastifyInstance, FastifyListenOptions } from 'fastify'
import app from './app.js'

//Opciones para el logger
const loggerOptions = {
  level: process.env.FASTIFY_LOG_LEVEL || 'trace',
  transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',  //Usar el formato de fecha del sistema
        ignore: 'pid,hostname',
        colorize: true,
      },
    }
}

//Opciones de fastify, algunas de las disponibles.
const fastifyOptions = {
  logger : loggerOptions,       // Las definidas arriba.
  ignoreTrailingSlash: true,    // No diferenciar entre /ruta y /ruta/
  // bodyLimit: 1048576,           // Límite de tamaño del body en bytes (1MB)
  // pluginTimeout: 10000,         // Timeout en ms para registro de plugins
  // maxParamLength: 100,          // Longitud máxima (en caracteres) de parámetros en rutas
  // disableRequestLogging: false, // Desactivar logs de requests
  // caseSensitive: true,          // Las rutas son sensibles a mayúsculas/minúsculas
}

// Parámetros para la escucha
const fastifyListenOptions : FastifyListenOptions = {
  port: parseInt(process.env.FASTIFY_PORT || '3000'),
  host: process.env.FASTIFY_HOST || '0.0.0.0',
}

//Creamos la instancia de fastify. única.
const fastify:FastifyInstance = Fastify(fastifyOptions)

//Registramos app donde tenemos el autoload, errorHandler, etc.
fastify.register(app);

//Ponemos el servidor a escuchar según fastifyListenOptions
fastify.listen(fastifyListenOptions, (err: any) => {
  if (err) {
    fastify.log.error(err)
    fastify.close();
    process.exit(1)
  }
})
