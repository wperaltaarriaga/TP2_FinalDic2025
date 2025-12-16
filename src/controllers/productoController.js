import { ProductRepositoryMongoose } from "../repository/productoRepositoryMongo.js";

const productRepository = new ProductRepositoryMongoose();

export const ProductController = {
	getAllProducts: async (request, response) => {
		try {
			const products = await productRepository.getAll();

			response.status(200).json({
				message: "OK",
				payload: products,
			});
		} catch (error) {
			console.error("Error al obtener los productos:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},

	// Obtener producto por ID
	getById: async (request, response) => {
		try {
			const { id } = request.params;
			const product = await productRepository.getOne(id);

			if (!product) {
				return response.status(404).json({ error: "Producto no encontrado" });
			}

			response.status(200).json({
				message: "OK",
				payload: product,
			});
		} catch (error) {
			console.error("Error al obtener producto por ID:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},

	// Crear producto desde JSON (body)
	createByJson: async (request, response) => {
		console.log("Métodos disponibles en ProductRepositoryMongoose:", Object.keys(ProductRepositoryMongoose));
		try {
			const { nombre, stock} = request.body;

			if (!nombre|| !stock ){
				return response.status(400).json({ error: "Faltan campos requeridos" });
			}
			console.log(nombre, stock);
			const newProduct = await productRepository.createOne({
				nombre,
				stock,
			});

			response.status(201).json({
				message: "Producto creado correctamente",
				payload: newProduct,
			});
		} catch (error) {
			console.error("Error al crear producto:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},

	// Actualizar producto desde JSON (body)
	updateByJson: async (request, response) => {
		try {
			const { id, nombre, stock } = request.body;
	
			if (!id) {
				return response.status(400).json({ error: "El ID del producto es obligatorio" });
			}
	
			if (typeof stock !== "number") {
				return response.status(400).json({ error: "El stock debe ser un número válido" });
			}
	
			// Obtener el producto actual
			const product = await productRepository.getOne(id);
			if (!product) {
				return response.status(404).json({ error: "Producto no encontrado" });
			}
	
			// Validar que el stock nunca sea menor a 0 y solo se pueda actualizar de uno en uno
			const stockDifference = Math.abs(product.stock - stock);
			if (stock < 0 || stockDifference !== 1) {
				return response.status(400).json({
					error: "El stock debe ser mayor o igual a 0 y solo puede ser incrementado o decrementado en 1 unidad",
				});
			}
	
			// Actualizar el producto
			const updated = await productRepository.updateOne(id, {
				nombre,
				stock,
			});
	
			response.status(200).json({
				message: "Producto actualizado correctamente",
				payload: updated,
			});
		} catch (error) {
			console.error("Error al actualizar producto:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},

	// Eliminar producto por ID
	deleteById: async (request, response) => {
		try {
			const { id } = request.params;

			const deleted = await productRepository.deleteOne(id);

			response.status(200).json({
				message: "Producto eliminado correctamente",
				payload: deleted,
			});
		} catch (error) {
			console.error("Error al eliminar producto:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},
};