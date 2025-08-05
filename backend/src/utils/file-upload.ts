import { FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { UCUErrorBadRequest } from "./index.js";

/**
 * Utility function to save a file from a multipart request
 * @param request - The Fastify request object
 * @param publicFolderPath - Path to the public folder relative to the project root
 * @param subfolder - Subfolder inside the public folder where the file will be saved
 * @returns The path to the saved file (relative to the public folder)
 */
export async function saveFile(
  request: FastifyRequest,
  publicFolderPath: string = "public",
  subfolder: string = "uploads"
): Promise<string> {
  try {
    // Check if the request is multipart
    if (!request.isMultipart()) {
      throw new UCUErrorBadRequest("Request is not multipart");
    }

    // Get the file from the request
    const data = await request.file();

    if (!data) {
      throw new UCUErrorBadRequest("No file uploaded");
    }

    // Check file type (optional: implement more rigorous validation)
    const fileType = data.mimetype.split("/")[0];
    if (fileType !== "image") {
      throw new UCUErrorBadRequest("Only image files are allowed");
    }

    // Create the directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), publicFolderPath, subfolder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a unique filename to avoid collisions
    const timestamp = new Date().getTime();
    const fileExtension = path.extname(data.filename) || ".jpg";
    const filename = `${timestamp}${fileExtension}`;

    // Save the file
    const filePath = path.join(uploadDir, filename);
    await pipeline(data.file, fs.createWriteStream(filePath));

    // Return the relative path for storage in DB
    return `${subfolder}/${filename}`;
  } catch (err) {
    console.error("Error saving file:", err);
    throw new UCUErrorBadRequest("Error processing file upload");
  }
}
