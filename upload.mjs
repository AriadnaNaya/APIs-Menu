import { data } from './frontend/src/data/data.js';          // tu array original
import grupoCategorias from './backend/utils/grupoCategorias.js';

/** Devuelve el mainCategory para un subcat dado */
function getMainCategory(subCat) {
    for (const [main, subs] of Object.entries(grupoCategorias)) {
        if (subs.includes(subCat)) return main;
    }
    return 'comida'; // fallback si no coincide
}

/** Limpia precio string o número */
function parsePrice(p) {
    if (typeof p === 'number') return p;
    if (typeof p === 'string') {
        const num = p.replace(/[^\d.]/g, '');
        return num === '' ? 0 : parseFloat(num);
    }
    return 0;
}

async function bulkUpload() {
    const transformed = data.map(item => {
        const base = {
            name:        item.nombre,
            description: item.descripcion || '',
            image:       item.img || '',
            category:    item.tipo,
            mainCategory: getMainCategory(item.tipo),
            price:       item.precio ? parsePrice(item.precio) : 0,
            variants:    Array.isArray(item.variantes)
                ? item.variantes.map(v => ({
                    name:  v.cantidad,
                    price: parsePrice(v.precio)
                }))
                : []
        };
        return base;
    });

    try {
        const res = await fetch('http://localhost:5000/api/items/bulk', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(transformed)
        });
        console.log('Bulk upload:', await res.json());
    } catch (err) {
        console.error(err);
    }
}

bulkUpload();
