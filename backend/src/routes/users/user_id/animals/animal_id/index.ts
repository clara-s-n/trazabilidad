import { FastifyPluginAsync } from "fastify";

const animalesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.put("/:id_animal", {
    schema: {
      tags: ["Animales"],
    },
    handler: async (request, reply) => {
      // Handle updating an animal logic
    },
  });

  fastify.delete("/:id_animal", {
    schema: {
      tags: ["Animales"],
    },
    handler: async (request, reply) => {
      // Handle deleting an animal logic
    },
  });

  fastify.get("/:id_animal", {
    schema: {
      tags: ["Animales"],
    },
    handler: async (request, reply) => {
      // Handle fetching a specific animal by ID logic
    },
  });
};

export default animalesRoute;
