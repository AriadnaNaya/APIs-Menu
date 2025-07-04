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
            subtitle: '',
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
                borderRadius: 0,
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
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
                            height: { xs: '38vh', md: '56vh' },
                            minHeight: 220,
                            maxHeight: 420,
                            backgroundImage: `url("${slide.image}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%'
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
                                position: 'absolute',
                                inset: 0,
                                zIndex: 1,
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
                                sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', md: '3rem' }, mb: slide.subtitle ? 1 : 0 }}
                            >
                                {slide.title}
                            </Typography>
                            {slide.subtitle && (
                                <Typography
                                    variant="h6"
                                    sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                                >
                                    {slide.subtitle}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
