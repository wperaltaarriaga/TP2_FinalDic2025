import axios from "axios";

export const AlbumRepository = {
  async fetchAlbums() {
    try {
      // Realizar la solicitud GET a la API externa
      const response = await axios.get("https://jsonplaceholder.typicode.com/albums");

      // Retornar los primeros 15 elementos
      return response.data.slice(0, 15);
    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
      throw new Error("No se pudieron obtener los álbumes");
    }
  },
};