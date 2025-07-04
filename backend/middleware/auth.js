import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import { JWT_SECRET } from '../server.js';

export const authMiddleware = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token requerido' });
    }
    const token = header.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await Client.findById(payload.id).select('-password');
        if (!user) return res.status(401).json({ error: 'Token inválido' });
        req.client = user;
        next();
    } catch {
        res.status(401).json({ error: 'Token inválido' });
    }
};
