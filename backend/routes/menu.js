import express from 'express';
import MenuItem from '../models/MenuItem.js';
import grupoCategorias from '../utils/grupoCategorias.js';
import { authMiddleware } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';


const router = express.Router();

// 1) GET /api/items/grouped
router.get('/grouped', async (req, res) => {
    try {
        const items = await MenuItem.find({ isDeleted: { $ne: true } });
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
        const {
            name,
            category,
            mainCategory,
            priceMin,
            priceMax
        } = req.query;

        const query = { isDeleted: { $ne: true } };

        if (name) {
            query.name = { $regex: name, $options: 'i' }; // búsqueda parcial, case-insensitive
        }
        if (category) {
            query.category = category;
        }
        if (mainCategory) {
            query.mainCategory = mainCategory;
        }
        if (priceMin || priceMax) {
            query.price = {};
            if (priceMin) query.price.$gte = Number(priceMin);
            if (priceMax) query.price.$lte = Number(priceMax);
        }

        const items = await MenuItem.find(query);
        res.json(items);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] GET /api/items ERROR:`, err);
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
router.post('/', authMiddleware, adminOnly, async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST /api/items by ${req.client._id}`);
    try {
        const { name, description, price, image, category, mainCategory, variants } = req.body;

        if (!name || !price || !category || !mainCategory) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const newItem = await MenuItem.create({
            name,
            description,
            price,
            image,
            category,
            mainCategory,
            variants
        });

        res.status(201).json(newItem);
        console.log(` → Created menu item ${newItem._id}`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] 400 /api/items ERROR:`, err);
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

// 6) PUT/api/items/:id → modificar un plato existente
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
    console.log(`[${new Date().toISOString()}] PUT /api/items/${req.params.id} by ${req.client._id}`);
    try {
        const updateData = { ...req.body };

        // 🔒 Validaciones:
        if ('_id' in updateData) {
            return res.status(400).json({ error: 'No se puede modificar el ID del plato' });
        }

        // 🔍 Validamos que al menos haya 1 campo permitido a modificar
        const allowedFields = ['name', 'description', 'price', 'image', 'category', 'mainCategory', 'variants'];
        const hasValidFields = Object.keys(updateData).some(key => allowedFields.includes(key));

        if (!hasValidFields) {
            return res.status(400).json({ error: 'No se proporcionaron campos válidos para actualizar' });
        }

        // 🔄 Ejecutar la actualización
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ error: 'Plato no encontrado' });
        }

        res.json(updatedItem);
        console.log(` → Updated item ${updatedItem._id}`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] 400 PUT /api/items/:id ERROR:`, err);
        res.status(400).json({ error: err.message });
    }
});

// 7) DELETE /api/items/:id → eliminación lógica
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    console.log(`[${new Date().toISOString()}] DELETE /api/items/${req.params.id} by ${req.client._id}`);
    try {
        const item = await MenuItem.findById(req.params.id);

        if (!item || item.isDeleted) {
            return res.status(404).json({ error: 'Plato no encontrado o ya eliminado' });
        }

        item.isDeleted = true;
        item.deletedBy = req.client._id;
        item.deletedAt = new Date();
        await item.save();

        res.json({ message: 'Plato eliminado lógicamente' });
        console.log(` → Deleted item=${item._id} by=${req.client._id}`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] 500 DELETE /api/items ERROR:`, err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
