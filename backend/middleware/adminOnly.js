export function adminOnly(req, res, next) {
    if (!req.client || req.client.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
    }
    next();
}