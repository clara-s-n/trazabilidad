import { FastifyPluginAsync } from "fastify";
import { UCUError } from "../../utils/index.js";
import { MultipartFile } from "@fastify/multipart";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const photoRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post("/", {
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
};

export default photoRoute;
