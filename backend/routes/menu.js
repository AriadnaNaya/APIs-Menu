// backend/routes/menu.js
import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// GET /api/items
// Devuelve todos los platos
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/items/:id
// Devuelve un plato por su ID
router.get('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item no encontrado' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
