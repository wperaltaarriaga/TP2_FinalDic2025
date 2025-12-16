import UsersRepository from "../repository/userRepositoryMongo.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "76h" });
};

export const UsersController = {

	getUserByUsername: async (request, response) => {
		try {
			const { username } = request.params;
			const user = await UsersRepository.getUserByUsername(username);
			if (!user) {
				return response.status(404).json({
					error: "Usuario no encontrado",
				});
			}
			response.status(200).json({
				message: "OK",
				payload: user,
			});
		} catch (error) {
			console.log("Error al obtener el usuario", error.message);
			response.status(500).json({
				message: "Error interno del servidor",
			});
		}
	},

	
	createByJson: async (request, response) => {
		try {
			const { username, password } = request.body;

			if (!username|| !password) { 
				return response.status(422).json({
					message: "completar los datos correctamente",
				});
			}

			const existingUser = await UsersRepository.getUserByUsername(username);
			console.log("Usuario encontrado:", existingUser);
			if (existingUser) {
				return response.status(409).json({
					message: "El username ya está registrado",
				});
			}

			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds); 

			const newUser = await UsersRepository.createUser({
				username,
				password: hashedPassword,
			});

			response.status(201).json({
				ok: true,
				payload: {
					message: `El usuario ${newUser.name} fue creado exitosamente`,
					user: newUser,
				},
			});
		} catch (error) {
			console.log("Error al crear el usuario", error.message);
			if (error.message.includes("El usuario ya está registrado")) {
				return response.status(409).json({
					message: error.message,
				});
			}
			response.status(500).json({
				message: "Error interno del servidor",
			});
		}
	},

	login: async (request, response) => {
		try {
			const { username, password } = request.body;

			if (!username|| !password) {
				return response.status(422).json({
					message: "Faltan datos obligatorios: username y password",
				});
			}
			const user = await UsersRepository.getUserByUsername(username);

			if (!user) {
				return response.status(401).json({
					message: "Credenciales inválidas",
				});
			}
			

			user.isActive = true; // Simulamos que el usuario está activo
			if (!user.isActive) {
				return response.status(401).json({
					message: "Usuario inactivo",
				});
			}

			const isValidPassword = await bcrypt.compare(password, user.password);
			console.log("¿Contraseña válida?:", isValidPassword);
			if (!isValidPassword) {
				return response.status(401).json({
					message: "Credenciales inválidas",
				});
			}

			// Generar token JWT
			const token = signToken({
				id: user._id.toString(),
				username: user.username,
			});

			response.status(200).json({
				ok: true,
				payload: {
					message: "Hola! ${{user.username}} Has iniciado sesión correctamente",
					token,
					user: {
						id: user._id,
						username: user.username,
					},
				},
			});
		} catch (error) {
			console.log("Error en login", error.message);
			response.status(500).json({
				message: "Error interno del servidor",
			});
		}
	},

}