// frontend/src/components/home/StorySection.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function StorySection() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
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
                borderRadius: { xs: 0, md: 4 },
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgcolor: isDark ? 'rgba(24,28,36,0.7)' : 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(2px)'
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
                    abrieron las puertas de Sushi Town. Hoy, cada bocado rinde
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
