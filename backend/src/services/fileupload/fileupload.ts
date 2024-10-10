import { Request, Response, NextFunction } from "express";
//import formidable, { Fields, Files } from "formidable";
import formidable, { Files } from "formidable";
import path from "path";
import fs from "fs";

// Ruta para manejar la subida de archivos
const FileUpload = (req: Request, res: Response, next: NextFunction) => {
  const uploadDir = path.join(__dirname, "../uploads"); // Definir el directorio de destino

  // Asegurarse de que la carpeta de destino exista
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir: uploadDir, // Directorio donde se guardarán los archivos
    keepExtensions: true, // Mantener las extensiones originales
    multiples: true, // Permitir la subida de múltiples archivos
  });

  //form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
  form.parse(req, (err: Error | null, _, files: Files) => {
    if (err) {
      next(err); // Manejar errores si los hay
      return;
    }

    // Obtener el archivo o archivos
    const uploadedFiles: any[] = [];

    Object.keys(files).forEach((key) => {
      const file = files[key] as formidable.File | formidable.File[]; // Puede ser un array si son múltiples archivos

      if (Array.isArray(file)) {
        file.forEach((f) => uploadedFiles.push(f));
      } else {
        uploadedFiles.push(file);
      }
    });

    // Crear URLs de los archivos subidos
    const fileUrls = uploadedFiles.map((file) => {
      return {
        fileUrl: `${req.protocol}://${req.get("host")}/uploads/${path.basename(
          (file as any).newFilename
        )}`, // Acceder a la nueva propiedad
      };
    });

    // Responder con la URL de los archivos subidos
    res.json({ fileUrls });
  });
};

export default FileUpload;
