import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import menuRouter         from './routes/menu.js';
import authRouter         from './routes/auth.js';
import reviewsRouter      from './routes/reviews.js';
import reservationsRouter from './routes/reservations.js';

const app = express();
app.use(cors());
app.use(express.json());

// Hardcodeamos el JWT_SECRET aquí:
export const JWT_SECRET = 'miSecretoMuySeguro123!';

// Conexión a Mongo (sin env vars)
mongoose
    .connect('mongodb://mongo:27017/townkitchen', {
        useNewUrlParser:    true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Error MongoDB:', err));

app.use('/api/auth',         authRouter);
app.use('/api/items',        menuRouter);
app.use('/api/reviews',      reviewsRouter);
app.use('/api/reservations', reservationsRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend escuchando en puerto ${PORT}`);
});
