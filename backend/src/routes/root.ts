import { FastifyPluginAsync } from "fastify";
import { WebSocket } from "@fastify/websocket";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(async (fastify, opts): Promise<void> => {
    fastify.route({
      method: "GET",
      url: "/",
      handler: async (req, reply) => {
        return { root: true };
      },
      wsHandler: (socket: WebSocket, req) => {
        socket.send("Bienvenido cliente.");
        socket.on("message", (chunk) => {
          fastify.websocketServer.clients.forEach((cliente) => {
            if (cliente !== socket) {
              cliente.send(chunk.toString());
            }
          });
          console.log(chunk.toString());
        });
      },
    });
  });
};

export default root;
