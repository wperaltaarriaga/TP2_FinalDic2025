import { UserModel } from "../models/user.js";

class UsersRepository {
	constructor(usersModel = UserModel) {
		this.UsersModel = usersModel;
	}


	async getUserByUsername(username) {
		try {
			const user = await this.UsersModel.findOne({ username });
			return user;
		} catch (error) {
			console.error("Error al obtener el usuario por username:", error);
			throw new Error(
				"Error al obtener el usuario por email: " + error.message,
			);
		}
	}

	async createUser(userData) {
		try {
			const newUser = await this.UsersModel.create(userData);
			const userResponse = newUser.toObject();
			delete userResponse.password;
			return userResponse;
		} catch (error) {
			console.error("Error al crear el usuario:", error);
			if (error.code === 11000) {
				throw new Error("El usuario ya está registrado");
			}
			throw new Error("Error al crear el usuario: " + error.message);
		}
	}

}

export default new UsersRepository();
