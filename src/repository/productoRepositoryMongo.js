import { ProductModel } from "../models/producto.js";

class ProductRepositoryMongoose {
    constructor(productModel = ProductModel) {
        this.ProductModel = productModel;
    }

    async getAll() {
        try {
            return await this.ProductModel.find({});
        } catch (error) {
            console.error("Error obteniendo todos los productos:", error);
            throw new Error("No se pudieron obtener los productos");
        }
    }

    async getOne(id) {
        try {
            const product = await this.ProductModel.findById(id);
            if (!product) {
                throw {
                    statusCode: 404,
                    error: `Producto con id ${id} no encontrado`,
                };
            }
            return product;
        } catch (error) {
            console.error(`Error obteniendo producto con id ${id}:`, error);
            throw error.statusCode
                ? error
                : { statusCode: 500, error: "Error al obtener el producto" };
        }
    }

    async createOne({ producto, stockAmount }) {
        try {
            const nuevoProducto = await this.ProductModel.create({
                producto,
                stockAmount,
            });
            return nuevoProducto;
        } catch (error) {
            console.error("Error creando producto:", error);
            throw {
                statusCode: 400,
                error: "No se pudo crear el producto",
            };
        }
    }

    async updateOne(id, { producto, stockAmount }) {
        try {
            const productoActualizado = await this.ProductModel.findByIdAndUpdate(
                id,
                { producto, stockAmount },
                { new: true }
            );

            if (!productoActualizado) {
                throw {
                    statusCode: 404,
                    error: `Producto con id ${id} no encontrado`,
                };
            }
            return productoActualizado;
        } catch (error) {
            console.error(`Error actualizando producto con id ${id}:`, error);
            throw error.statusCode
                ? error
                : { statusCode: 500, error: "No se pudo actualizar el producto" };
        }
    }

    async deleteOne(id) {
        try {
            const productoEliminado = await this.ProductModel.findByIdAndDelete(id);
            if (!productoEliminado){
                throw {
                    statusCode: 404,
                    error: `Producto con id ${id} no encontrado`,
                };
            }
            return productoEliminado;
        } catch (error) {
            console.error(`Error eliminando producto con id ${id}:`, error);
            throw error.statusCode
                ? error
                : { statusCode: 500, error: "No se pudo eliminar el producto" };
       }
    }
}

export { ProductRepositoryMongoose };