import mongoose from 'mongoose';
import { config } from '../config/index.js';

class MongooseConnection {

    constructor() {
        this.connection = null;
    }

    async connect() {
        if (this.connection) {
            return this.connection;
        }
        try {
            await mongoose.connect(config.MONGO_URI, {
                dbName: 'ort-database', // Mantén el nombre de la base de datos
            });
            this.connection = mongoose.connection;
            console.log('✅ Mongoose connected');
            return this.connection;
        } catch (err) {
            console.error('❌ Error connecting to Mongoose:', err);
            throw err;
        }
    }
}


export default new MongooseConnection();