// frontend/src/components/HeroSlider.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imageErrors, setImageErrors] = useState({});

    // Slides con imágenes verificadas
    const slides = [
        {
            title: 'Sushi Town',
            subtitle: 'Experiencia gastronómica única',
            image: '/img/heroNuevo1.png'
        },
        {
            title: 'Delicias de Mar',
            subtitle: 'Frescura y sabor',
            image: '/img/hero1.jpg'
        },
        {
            title: 'Ambiente Único',
            subtitle: 'Disfruta con nosotros',
            image: '/img/hero2.jpg'
        },
        {
            title: 'Tradición Japonesa',
            subtitle: 'Sabores auténticos',
            image: '/img/hero3.jpg'
        }
    ];

    // Auto-slide cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Función para manejar errores de carga de imágenes
    const handleImageError = (e, index) => {
        console.error('Error loading image:', e.target.src);
        setImageErrors(prev => ({ ...prev, [index]: true }));
    };

    // Función para manejar carga exitosa de imágenes
    const handleImageLoad = (e, index) => {
        console.log('Image loaded successfully:', e.target.src);
        setImageErrors(prev => ({ ...prev, [index]: false }));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <Box
            component="section"
            sx={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                marginTop: { xs: '-56px', sm: '-64px' },
                paddingTop: { xs: '56px', sm: '64px' },
                overflow: 'hidden',
                borderRadius: 0,
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)'
            }}
        >
            {/* Contenedor principal del slider */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '38vh', md: '56vh' },
                    minHeight: 220,
                    maxHeight: 420,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5' // Color de fondo mientras carga
                }}
            >
                {/* Slide actual */}
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentSlide ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Imagen de fondo */}
                        {!imageErrors[index] && (
                            <Box
                                component="img"
                                src={slide.image}
                                alt={slide.title}
                                onError={(e) => handleImageError(e, index)}
                                onLoad={(e) => handleImageLoad(e, index)}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    zIndex: 0
                                }}
                            />
                        )}

                        {/* Fallback si hay error en la imagen */}
                        {imageErrors[index] && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#e0e0e0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 0
                                }}
                            >
                                <Typography color="text.secondary">
                                    Error cargando imagen: {slide.image}
                                </Typography>
                            </Box>
                        )}

                        {/* Overlay */}
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                bgcolor: 'rgba(0,0,0,0.4)',
                                zIndex: 1
                            }}
                        />

                        {/* Texto */}
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                zIndex: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: '#fff',
                                px: 2
                            }}
                        >
                            <Typography
                                variant="h3"
                                component="h2"
                                gutterBottom={!!slide.subtitle}
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: { xs: '1.8rem', md: '3rem' },
                                    mb: slide.subtitle ? 1 : 0,
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                                }}
                            >
                                {slide.title}
                            </Typography>
                            {slide.subtitle && (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.25rem' },
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                                    }}
                                >
                                    {slide.subtitle}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ))}

                {/* Botones de navegación */}
                <IconButton
                    onClick={prevSlide}
                    sx={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.5)'
                        }
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <IconButton
                    onClick={nextSlide}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.5)'
                        }
                    }}
                >
                    <ArrowForwardIcon />
                </IconButton>

                {/* Indicadores de puntos */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1,
                        zIndex: 3
                    }}
                >
                    {slides.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: index === currentSlide ? 
                                    'rgba(255,255,255,0.9)' : 
                                    'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    transform: 'scale(1.1)'
                                }
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
