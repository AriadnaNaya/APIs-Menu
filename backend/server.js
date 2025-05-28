// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import menuRoutes from './routes/menu.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/items', menuRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB conectado'))
    .catch(err => console.error('❌ Error MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend escuchando en puerto ${PORT}`));
