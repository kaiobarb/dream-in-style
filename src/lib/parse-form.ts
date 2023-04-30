import type { NextApiRequest } from "next";
import mime from "mime";
import formidable from "formidable";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const form = formidable({
      maxFiles: 1,
      maxFileSize: 1024 * 1024 * 10, // 10mb
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || "") || "unknown"
        }`;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === "zipFile" && (part.mimetype === "application/zip" || false)
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
