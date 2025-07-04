// frontend/src/components/home/HeroSection.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <Box
            component="section"
            sx={{
                /* Extiende al ancho completo de la ventana */
                position: 'relative',
                width: '100vw',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                /* Altura responsive */
                height: { xs: '38vh', md: '56vh' },
                minHeight: 220,
                maxHeight: 420,
                /* Imagen de fondo */
                backgroundImage: `url("/img/heroNuevo1.png")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                /* Overlay semitransparente */
                borderRadius: 0,
                overflow: 'hidden',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(2px)'
                },
                /* Centrado de contenido */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#fff',
                zIndex: 1
            }}
        >
            {/* Contenido encima del overlay */}
            <Box sx={{ position: 'relative', zIndex: 2, px: 2 }}>
                <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', md: '3rem' }
                    }}
                >
                    Bienvenido a Sushi Town
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Descubre el sabor auténtico de la fusión japonés-urbana
                </Typography>
                <Button
                    component={Link}
                    to="/menu"
                    variant="contained"
                    size="large"
                    sx={{ mt: 3 }}
                >
                    Explorar carta
                </Button>
            </Box>
        </Box>
    );
}
