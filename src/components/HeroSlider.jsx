import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const images = [
    '/img/hero11.jpg',
    '/img/hero2.jpg',
    '/img/hero3.jpg'
];

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 30000); // cambia cada 30 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '865px', md: '865px' },
                overflow: 'hidden',
                mb: 4,
                backgroundColor: '#111827', // fallback en caso de que no cargue la imagen
            }}
        >
            {/* Fondo absoluto con la imagen */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${images[currentIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 40%',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0.5)',
                    zIndex: 0,
                    transition: 'background-image 1s ease-in-out',
                }}
            />

            {/* Título encima */}
            <Typography
                variant="h2"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    color: '#111827',
                    textAlign: 'center',
                    fontFamily: "'Bonheur Royale', cursive",
                    fontSize: { xs: '5rem', md: '9rem' },
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            >
                Sushi Town
            </Typography>
        </Box>
    );
};

export default HeroSlider;
