// APIs/backend/seed.js
import mongoose from 'mongoose';
import Client from './models/Client.js';
import Review from './models/Review.js';
import Reservation from './models/Reservation.js'

async function seed() {
    const MONGO_URI = 'mongodb://mongo:27017/townkitchen';
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('🌱 Conectado a MongoDB');

    await Review.deleteMany({});
    await Client.deleteMany({});
    await Reservation.deleteMany({});
    console.log('🧹 Colecciones Client y Review vaciadas');

    const clientsData = [
        {
            name: 'Alice Smith',
            contact: 'alice@example.com',
            password: 'password1',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        {
            name: 'Bob Johnson',
            contact: 'bob@example.com',
            password: 'password2',
            avatar: 'https://randomuser.me/api/portraits/men/34.jpg'
        },
        {
            name: 'Charlie Lee',
            contact: 'charlie@example.com',
            password: 'password3',
            avatar: 'https://randomuser.me/api/portraits/men/65.jpg'
        },
        {
            name: 'Diana Prince',
            contact: 'diana@example.com',
            password: 'password4',
            avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
        },
        {
            name: 'Edward Norton',
            contact: 'edward@example.com',
            password: 'password5',
            avatar: 'https://randomuser.me/api/portraits/men/23.jpg'
        }
    ];

    const sampleComments = [
        '¡El sushi estaba espectacular!',
        'Muy buen servicio y ambiente.',
        'Volveré sin duda, me encantó todo.',
        'La calidad de los ingredientes se nota.',
        'Recomendado 100%. ¡Delicioso!'
    ];

    for (const data of clientsData) {
        const client = await Client.create(data);
        console.log(`👤 Cliente creado: ${client.name}`);

        const reviewsCount = Math.random() < 0.5 ? 1 : 2;
        for (let i = 0; i < reviewsCount; i++) {
            const comment = sampleComments[
                Math.floor(Math.random() * sampleComments.length)
                ];
            const rating = Math.floor(Math.random() * 5) + 1;
            const rev = await Review.create({
                client: client._id,
                rating,
                comment
            });
            console.log(`   ⭐ Reseña (${rating}): "${comment}"`);
        }
    }

    console.log('✅ Seed completado');
    await mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
