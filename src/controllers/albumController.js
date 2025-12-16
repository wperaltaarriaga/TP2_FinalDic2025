import { AlbumRepository } from "../repository/albumRepository.js";
import { parse } from "json2csv";
import fs from "fs";
import path from "path";

export const AlbumController = {
  async getAlbumsCsv(req, res) {
    try {
      // 1. Obtener los primeros 15 álbumes desde el repositorio
      const albums = await AlbumRepository.fetchAlbums();

      // 2. Convertir los datos a formato CSV
      const fields = ["userId", "id", "title"];
      const csv = parse(albums, { fields });

      // 3. Guardar el archivo CSV localmente
      const filePath = path.join(process.cwd(), "albums_15.csv");
      fs.writeFileSync(filePath, csv);

      // 4. Devolver el archivo CSV en la respuesta
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=albums_15.csv");
      res.send(csv);
    } catch (error) {
      console.error("Error al generar el archivo CSV:", error);
      res.status(500).json({ error: "Error al generar el archivo CSV" });
    }
  },
};