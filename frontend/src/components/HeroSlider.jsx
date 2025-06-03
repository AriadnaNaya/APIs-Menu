// frontend/src/components/HeroSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';

export default function HeroSlider() {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
    };

    // Ejemplo de slides; ajusta las imágenes y textos según tu contenido real
    const slides = [
        {
            title: 'Sushi Town',
            subtitle: 'Explora nuestra carta',
            image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'
        },
        {
            title: 'Delicias de Mar',
            subtitle: 'Frescura y sabor',
            image: 'https://images.unsplash.com/photo-1547592166-3f2bdcef15c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'
        },
        {
            title: 'Ambiente Único',
            subtitle: 'Disfruta con nosotros',
            image: 'https://images.unsplash.com/photo-1541542689-2c9e50e74ea4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'
        }
    ];

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
                overflow: 'hidden',
                '& .slick-slider, & .slick-list, & .slick-track': {
                    display: 'flex'
                }
            }}
        >
            <Slider {...settings}>
                {slides.map((slide, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            position: 'relative',
                            height: { xs: '40vh', md: '60vh' },
                            backgroundImage: `url("${slide.image}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Overlay */}
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                bgcolor: 'rgba(0,0,0,0.4)'
                            }}
                        />

                        {/* Texto */}
                        <Box
                            sx={{
                                position: 'relative',
                                zIndex: 1,
                                textAlign: 'center',
                                color: '#fff',
                                px: 2
                            }}
                        >
                            <Typography
                                variant="h3"
                                component="h2"
                                gutterBottom
                                sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', md: '3rem' } }}
                            >
                                {slide.title}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                            >
                                {slide.subtitle}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
