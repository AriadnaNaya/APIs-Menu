// frontend/src/components/home/StorySection.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function StorySection() {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                left: '50%',
                marginLeft: '-50vw',
                bgcolor: 'background.paper',
                color: 'text.primary',
                py: { xs: 6, md: 12 },
                backgroundImage: `url("https://images.unsplash.com/photo-1541542689-2c9e50e74ea4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.5)'
                },
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Container
                maxWidth="md"
                sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
            >
                <Typography variant="h4" gutterBottom>
                    Sobre Nosotros
                </Typography>
                <Typography variant="body1" paragraph>
                    Hace más de una década, dos amigos soñaron con un rincón donde la
                    tradición del sushi se encontrara con la energía de la ciudad.
                    Tras meses de pruebas, recetas olvidadas y risas compartidas,
                    abrieron las puertas de Town Kitchen. Hoy, cada bocado rinde
                    homenaje a aquel sueño: ingredientes frescos, un servicio
                    cercano y un espacio donde cada comida se convierte en una
                    celebración de amistad y sabor.
                </Typography>
                <Typography variant="body1">
                    Te invitamos a ser parte de esta historia: tu próxima visita
                    será el capítulo más delicioso de todos.
                </Typography>
            </Container>
        </Box>
    );
}
