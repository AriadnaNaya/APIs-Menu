// APIs/backend/routes/auth.js
import express from 'express';
import jwt     from 'jsonwebtoken';
import Client  from '../models/Client.js';
import { authMiddleware } from '../middleware/auth.js';
import { JWT_SECRET }     from '../server.js';
import { adminOnly } from '../middleware/adminOnly.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST /api/auth/register`);
    try {
        const { name, contact, password, avatar } = req.body;
        if (await Client.findOne({ contact })) {
            return res.status(400).json({ error: 'Usuario ya existe' });
        }
        const avatarUrl = avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
        const client = new Client({ name, contact, password, avatar: avatarUrl });
        await client.save();
        const token = jwt.sign({ id: client._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({
            token,
            client: { id: client._id, name, contact, avatar: avatarUrl, role: client.role}
        });
        console.log(`[${new Date().toISOString()}]  → 200 Registered client=${client._id}`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] 500 /api/auth/register ERROR:`, err);
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST /api/auth/login`);
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
                avatar:  client.avatar,
                role:    client.role
            }
        });
        console.log(`[${new Date().toISOString()}]  → 200 Logged in client=${client._id}`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] 500 /api/auth/login ERROR:`, err);
        res.status(500).json({ error: err.message });
    }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
    console.log(`[${new Date().toISOString()}] GET /api/auth/me client=${req.client._id}`);
    const { _id: id, name, contact, avatar, role } = req.client;
    res.json({ client: { id, name, contact, avatar, role } });
    console.log(`[${new Date().toISOString()}]  → 200 Returned profile for client=${id}`);
});

// PUT /api/auth/me
router.put('/me', authMiddleware, async (req, res) => {
    console.log(`[${new Date().toISOString()}] PUT /api/auth/me client=${req.client._id}`);
    try {
        const { name, contact, password } = req.body;
        const client = req.client;
        if (name)     client.name     = name;
        if (contact)  client.contact  = contact;
        if (password) client.password = password; // se hashea en pre-save
        await client.save();
        const updated = client.toObject();
        delete updated.password;
        res.json({ client: updated });
        console.log(`[${new Date().toISOString()}]  → 200 Updated client=${client._id}`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] 400 /api/auth/me ERROR:`, err);
        res.status(400).json({ error: err.message });
    }
});

// Listar todos los clientes (solo admin)
router.get('/clients', authMiddleware, adminOnly, async (req, res) => {
    try {
        const clients = await Client.find({}, '-password');
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar cliente (solo admin)
router.put('/clients/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { name, contact, avatar, role } = req.body;
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
        if (name) client.name = name;
        if (contact) client.contact = contact;
        if (avatar) client.avatar = avatar;
        if (role) client.role = role;
        await client.save();
        const updated = client.toObject();
        delete updated.password;
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar cliente (solo admin)
router.delete('/clients/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
