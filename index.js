import { config } from "./src/config/index.js";
import MongooseConnection from "./src/databases/mongo.cnx.js";
import server from "./src/app.js";

const runServer = async () => {
	try {
		await MongooseConnection.connect();
		server.listen(
			config.SERVER_PORT,
			config.SERVER_HOST,
			console.log(
				`✅ Server listening at http://${config.SERVER_HOST}:${config.SERVER_PORT}`,
			),
		);
	} catch (error) {
		console.error("❌ Error starting server:", error);
	}
};

runServer();