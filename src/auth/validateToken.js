import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const validateToken = async (token) => {
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        return { isValid: true, user: decoded };
    } catch (error) {
        return { isValid: false };
    }
};