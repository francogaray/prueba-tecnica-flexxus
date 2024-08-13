// Middleware de autenticación
export const authenticateUser = (req, res, next) => {
    if (req.headers.authorization === "Bearer secretToken") {
        next();
    } else {
        res.status(401).json({ error: "No autorizado" });
    }
};