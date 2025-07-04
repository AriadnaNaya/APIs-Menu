// APIs/backend/seed-items.js
import mongoose from 'mongoose';
import MenuItem from './models/MenuItem.js';
import { data } from './data/data.js';
import grupoCategorias from './utils/grupoCategorias.js';

/** Devuelve la categoría principal a partir de la subcategoría */
function getMainCategory(subCat) {
  for (const [main, subs] of Object.entries(grupoCategorias)) {
    if (subs.includes(subCat)) return main;
  }
  return 'comida';
}

/** Limpia el precio, ya sea string o número */
function parsePrice(p) {
  if (typeof p === 'number') return p;
  if (typeof p === 'string') {
    const num = p.replace(/[^\d.]/g, '');
    return num === '' ? 0 : parseFloat(num);
  }
  return 0;
}

async function seedItems() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/menu_db';
  await mongoose.connect(mongoUri);
  console.log('✔️ Conectado a MongoDB');

  await MenuItem.deleteMany({});
  console.log('🗑️  Colección MenuItem limpiada');

  const docs = data.map(item => ({
    name:         item.nombre,
    description:  item.descripcion || '',
    image:        item.img || '',
    category:     item.tipo,
    mainCategory: getMainCategory(item.tipo),
    price:        item.precio ? parsePrice(item.precio) : 0,
    variants: Array.isArray(item.variantes)
      ? item.variantes.map(v => ({
          name:  v.cantidad,
          price: parsePrice(v.precio)
        }))
      : []
  }));

  await MenuItem.insertMany(docs);
  console.log(`🌱 Insertados ${docs.length} elementos en MenuItem`);

  process.exit(0);
}

seedItems().catch(err => {
  console.error('❌ Error en seed-items:', err);
  process.exit(1);
});
