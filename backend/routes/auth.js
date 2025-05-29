import express from 'express';
import jwt     from 'jsonwebtoken';
import Client  from '../models/Client.js';
import { authMiddleware } from '../middleware/auth.js';
import { JWT_SECRET }     from '../server.js';

const router = express.Router();

// Registro (no requiere token)
router.post('/register', async (req, res) => {
    try {
        const { name, contact, password, avatar } = req.body;
        if (await Client.findOne({ contact })) {
            return res.status(400).json({ error: 'Usuario ya existe' });
        }
        // Generar avatar si no viene
        const avatarUrl = avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
        const client = new Client({ name, contact, password, avatar: avatarUrl });
        await client.save();

        const token = jwt.sign({ id: client._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({
            token,
            client: { id: client._id, name, contact, avatar: avatarUrl }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login (no requiere token)
router.post('/login', async (req, res) => {
    try {
        const { contact, password } = req.body;
        const client = await Client.findOne({ contact });
        if (!client || !(await client.comparePassword(password))) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ id: client._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({
            token,
            client: {
                id:      client._id,
                name:    client.name,
                contact: client.contact,
                avatar:  client.avatar
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener perfil del usuario logueado
router.get('/me', authMiddleware, (req, res) => {
    const { _id: id, name, contact, avatar } = req.client;
    res.json({ client: { id, name, contact, avatar } });
});

export default router;
