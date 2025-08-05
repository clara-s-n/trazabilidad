import fp from "fastify-plugin";
import staticFiles from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * This plugin serves static files from the public directory
 */
export default fp(async (fastify) => {
  fastify.register(staticFiles, {
    root: path.join(__dirname, "..", "..", "public"),
    prefix: "/public/", // This will be the URL prefix
  });
});
