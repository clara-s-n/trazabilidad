import { FastifyPluginAsync } from "fastify";
import { UCUError } from "../../utils/index.js";
import { MultipartFile } from "@fastify/multipart";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Type } from "@sinclair/typebox";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const photoRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.put("/", {
    handler: async (request, reply) => {
      const data: MultipartFile | undefined = await request.file();
      if (!data) throw new UCUError("no hay archivo.");

      //   data.file;
      //   data.fields;
      //   data.fieldname;
      //   data.filename;
      //   data.encoding;
      //   data.mimetype;

      const _filename = fileURLToPath(import.meta.url);
      const _dirname = dirname(_filename);
      const baseDir = process.cwd();
      console.log({ _dirname, _filename, baseDir });

      const buffer = await data.toBuffer();
      const savePath = `./public/${data.filename}`;

      await writeFile(savePath, buffer);
    },
  });

  fastify.get("/:email", {
    schema: {
      params: Type.Object({
        email: Type.String(),
      }),
    },
    handler: async (request, reply) => {
      const params = request.params.email;
      reply.type("image/jpeg");
      const baseDir = process.cwd();
      const fotoPath = join(baseDir, "public", params + ".jpg");
      const buffer = await readFile(fotoPath);
      return buffer;
    },
  });
};

export default photoRoute;
