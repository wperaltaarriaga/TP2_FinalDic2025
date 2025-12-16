import { Router } from "express";
import { ProductController } from "../controllers/productoController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { AlbumController } from "../controllers/albumController.js";

const ProductRouter = Router();


ProductRouter.post("/productos", ProductController.createByJson); /* crear producto */
ProductRouter.get("/productos", ProductController.getAllProducts); /* listar productos */
ProductRouter.get("/productos/:id", ProductController.getById); /* obtener por id */
ProductRouter.put("/productos/:id", authenticate, ProductController.updateByJson); /* obtener token y actualizar por id  */
ProductRouter.delete("/productos/:id", authenticate, ProductController.deleteById); /* obtener token y elimir por id */

ProductRouter.get("/albums/csv", AlbumController.getAlbumsCsv); /* cargar productos desde CSV */

export default ProductRouter;