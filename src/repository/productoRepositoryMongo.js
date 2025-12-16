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
            if (!product) throw new Error(`Producto con id ${id} no encontrado`);
            return product;
        } catch (error) {
            console.error(`Error obteniendo producto con id ${id}:`, error);
            throw new Error("Error al obtener el producto");
        }
    }

    async createOne({ nombre, stock }) {
        try {
            const nuevoProducto = await this.ProductModel.create({
                nombre,
                stock,
            });
            return nuevoProducto;
        } catch (error) {
            console.error("Error creando producto:", error);
            throw new Error("No se pudo crear el producto");
        }
    }

    async updateOne(id, { nombre, stock }) {
        try {
            const productoActualizado = await this.ProductModel.findByIdAndUpdate(
                id,
                { nombre, stock },
                { new: true }
            );

            if (!productoActualizado)
                throw new Error(`Producto con id ${id} no encontrado`);

            return productoActualizado;
        } catch (error) {
            console.error(`Error actualizando producto con id ${id}:`, error);
            throw new Error("No se pudo actualizar el producto");
        }
    }

    async deleteOne(id) {
        try {
            const productoEliminado = await this.ProductModel.findByIdAndDelete(id);
            if (!productoEliminado)
                throw new Error(`Producto con id ${id} no encontrado`);
            return productoEliminado;
        } catch (error) {
            console.error(`Error eliminando producto con id ${id}:`, error);
            throw new Error("No se pudo eliminar el producto");
        }
    }
}

export { ProductRepositoryMongoose };