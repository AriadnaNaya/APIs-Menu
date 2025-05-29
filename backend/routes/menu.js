import express from 'express';
import MenuItem from '../models/MenuItem.js';
import grupoCategorias from '../utils/grupoCategorias.js';

const router = express.Router();

// 1) GET /api/items/grouped
router.get('/grouped', async (req, res) => {
    try {
        const items = await MenuItem.find();
        // Agrupamos por mainCategory
        const grouped = items.reduce((acc, item) => {
            const mc = item.mainCategory;
            if (!acc[mc]) acc[mc] = [];
            acc[mc].push(item);
            return acc;
        }, {});
        res.json(grouped);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// 2) GET /api/items (sin agrupar)
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3) GET /api/items/:id
router.get('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'No encontrado' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4) POST /api/items
router.post('/', async (req, res) => {
    try {
        const newItem = await MenuItem.create(req.body);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5) POST /api/items/bulk
router.post('/bulk', async (req, res) => {
    try {
        const docs = await MenuItem.insertMany(req.body);
        res.status(201).json({
            insertedCount: docs.length,
            insertedIds: docs.map(d => d._id)
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
