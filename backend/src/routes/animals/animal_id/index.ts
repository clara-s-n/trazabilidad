import { FastifyPluginAsync } from "fastify";
import { AnimalParams } from "../../../schemas/animal.js";
//import { UserParams } from "../../../../../schemas/user.js";
//import { Type } from "@sinclair/typebox";

const animalesRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.put("/:animal_id", {
    schema: {
      tags: ["Animales"],
      //params: Type.Intersect([UserParams, AnimalParams])
      params: AnimalParams
    },
    handler: async (request, reply) => {
      // Handle updating an animal logic
    },
  });

  fastify.delete("/:animal_id", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams
    },
    handler: async (request, reply) => {
      // Handle deleting an animal logic
    },
  });

  fastify.get("/:animal_id", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams
    },
    handler: async (request, reply) => {
      // Handle fetching a specific animal by ID logic
    },
  });

  fastify.get("/:animal_id/modifications", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      summary: "Ver el historial de modificaciones realizadas a los datos de un animal",
      description: "Ver el historial de modificaciones realizadas a los datos de un animal"
    },
    handler: async (request, reply) => {
      // Handle fetching a specific animal by ID logic
    },
  });

  fastify.get("/:animal_id/events", {
    schema: {
      tags: ["Animales"],
      params: AnimalParams,
      summary: "Ver el historial de eventos de un animal",
      description: "Ver el historial de eventos de un animal"
    },
    handler: async (request, reply) => {
      // Handle fetching a specific animal by ID logic
    },
  });
};

export default animalesRoute;
