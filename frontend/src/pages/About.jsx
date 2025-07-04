// frontend/src/pages/About.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function About() {
    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h3" gutterBottom>Sobre Nosotros</Typography>
            <Typography paragraph>
                En Town Kitchen nacimos de la pasión por la cocina de fusión. Desde nuestros humildes comienzos en 2010, siempre hemos buscado...
            </Typography>
            <Box
                component="img"
                src="/img/restaurant.jpg"
                alt="Nuestro restaurante"
                sx={{
                    width: '100%',
                    maxHeight: { xs: 220, sm: 320, md: 400 },
                    objectFit: 'cover',
                    borderRadius: 3,
                    my: 4,
                    boxShadow: 2
                }}
            />
            <Typography paragraph>
                Nuestro equipo está comprometido con la calidad, la innovación y, sobre todo, con brindar una experiencia inolvidable.
            </Typography>
        </Container>
    );
}
