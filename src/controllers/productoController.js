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
			response.json({
                statusCode: 500,
                error: "No se pudieron obtener los productos",
            });
		}
	},

	getById: async (request, response) => {
		try {
			const { id } = request.params;
			const product = await productRepository.getOne(id);

			if (!product) {
				return response.json({
                    statusCode: 404,
                    error: `Producto con id ${id} no encontrado`,
                });
			}

			response.status(200).json({
				message:  "Producto obtenido exitosamente",
				payload: product,
			});
		} catch (error) {
			console.error(`Error al obtener producto con id ${id}:`, error);
			response.json({
                statusCode: 500,
                error: "Error al obtener el producto",
            });
		}
	},

	createByJson: async (request, response) => {
		console.log("Métodos disponibles en ProductRepositoryMongoose:", Object.keys(ProductRepositoryMongoose));
		try {
			const { producto, stockAmount} = request.body;

			if (!producto|| !stockAmount ){
				return response.json({
                    statusCode: 400,
                    error: "Faltan campos requeridos",
                });
			}

			// Validar que stockAmount sea 0 o más
			if (stockAmount < 0) {
				return response.json({
                    statusCode: 400,
                    error: "El stockAmount debe ser 0 o mayor",
                });
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
			response.json({
                statusCode: 500,
                error: "No se pudo crear el producto",
            });
		}
	},

	// Actualizar producto desde JSON (body)
	updateByJson: async (request, response) => {
		try {
			const { id, producto, stockAmount } = request.body;
	
			if (!id) {
				return response.json({
                    statusCode: 400,
                    error: "El ID del producto es obligatorio",
                });
			}
	
			if (typeof stockAmount !== "number") {
				return response.json({
                    statusCode: 400,
                    error: "El stockAmount debe ser un número válido",
                });
			}

			const product = await productRepository.getOne(id);
			if (!product) {
				return response.json({
                    statusCode: 404,
                    error: "Producto no encontrado",
                });
			}
	
			// Validar que el stockAmount nunca sea menor a 0 y solo se pueda actualizar de uno en uno
			const stockAmountDifference = Math.abs(product.stockAmount - stockAmount);
			if (stockAmount < 0 || stockAmountDifference !== 1) {
				return response.json({
					statusCode: 400,
					error: "El stockAmount debe ser mayor o igual a 0 y solo puede ser incrementado o decrementado en 1 unidad",
				});
			}
	
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
			response.status(500).json({
                statusCode: 500,
                error: "Error interno del servidor",
            });
		}
	},

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
			response.json({
                statusCode: 500,
                error: "Error interno del servidor",
            });
		}
	},
};