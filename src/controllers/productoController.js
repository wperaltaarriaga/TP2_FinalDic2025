import { ProductRepositoryMongoose } from "../repository/productoRepositoryMongo.js";

const productRepository = new ProductRepositoryMongoose();

export const ProductController = {
	getAllProducts: async (request, response) => {
		try {
			const products = await productRepository.getAll();

			response.status(200).json({
				message: "Lista de productos obtenida exitosamente",
				payload: products,
			});
		} catch (error) {
			console.error("Error al obtener los productos:", error.message);
			response.status(500).json({ error: "No se pudieron obtener los productos" });
		}
	},

	// Obtener producto por ID
	getById: async (request, response) => {
		try {
			const { id } = request.params;
			const product = await productRepository.getOne(id);

			if (!product) {
				return response.status(404).json({ error:`Producto con id ${id} no encontrado` });
			}

			response.status(200).json({
				message:  "Producto obtenido exitosamente",
				payload: product,
			});
		} catch (error) {
			console.error(`Error al obtener producto con id ${id}:`, error);
			response.status(500).json({ error: "Error al obtener el producto"});
		}
	},

	// Crear producto desde JSON (body)
	createByJson: async (request, response) => {
		console.log("Métodos disponibles en ProductRepositoryMongoose:", Object.keys(ProductRepositoryMongoose));
		try {
			const { producto, stockAmount} = request.body;

			if (!producto|| !stockAmount ){
				return response.status(400).json({ error: "Faltan campos requeridos" });
			}
			console.log(producto, stockAmount);
			const newProduct = await productRepository.createOne({
				producto,
				stockAmount,
			});

			response.status(201).json({
				message: "Producto creado exitosamente",
				payload: newProduct,
			});
		} catch (error) {
			console.error("Error al crear producto:", error.message);
			response.status(500).json({ error: "No se pudo crear el producto" });
		}
	},

	// Actualizar producto desde JSON (body)
	updateByJson: async (request, response) => {
		try {
			const { id, producto, stockAmount } = request.body;
	
			if (!id) {
				return response.status(400).json({ error: "El ID del producto es obligatorio" });
			}
	
			if (typeof stockAmount !== "number") {
				return response.status(400).json({ error: "El stockAmount debe ser un número válido" });
			}
	
			// Obtener el producto actual
			const product = await productRepository.getOne(id);
			if (!product) {
				return response.status(404).json({ error: "Producto no encontrado" });
			}
	
			// Validar que el stockAmount nunca sea menor a 0 y solo se pueda actualizar de uno en uno
			const stockAmountDifference = Math.abs(product.stockAmount - stockAmount);
			if (stockAmount < 0 || stockAmountDifference !== 1) {
				return response.status(400).json({
					error: "El stockAmount debe ser mayor o igual a 0 y solo puede ser incrementado o decrementado en 1 unidad",
				});
			}
	
			// Actualizar el producto
			const updated = await productRepository.updateOne(id, {
				producto,
				stockAmount,
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