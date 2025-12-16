/* El archivo server.js es el punto de entrada principal para configurar y ejecutar el servidor Express. 
Su propósito es inicializar el servidor, configurar los middlewares necesarios y definir las rutas que manejarán 
las solicitudes HTTP  */

import express from "express"
import morgan from "morgan"
import ProductRouter from "./routes/productoService.js"    
import jwtRouter from "./routes/adminService.js"


const morganModule = morgan(":method :url :status :res[content-length] - :response-time ms")

const server = express()
server.use(express.json())
server.use(morganModule)

server.use("/api/v1", ProductRouter);
server.use("/api/user", jwtRouter);


server.use((request, response, next) => {
	response.status(404).send("No está disponible este endpoint: " + request.url);
});



export default server