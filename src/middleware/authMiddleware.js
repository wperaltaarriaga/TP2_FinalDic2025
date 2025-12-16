import { validateToken } from "../auth/validateToken.js";

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Se requiere el header Authorization: Bearer <token>",
            });
        }

        const token = authHeader.split(" ")[1];
        const { isValid, user } = await validateToken(token);

        if (!isValid) {
            return res.status(403).json({
                error: "Forbidden",
                message: "Token inválido o expirado",
            });
        }

    
        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Error al procesar la autenticación",
        });
    }
};