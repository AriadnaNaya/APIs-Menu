import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box, Avatar, Button } from '@mui/material';
import Slider from 'react-slick';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function TestimonialSection() {
    const { token } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/api/reviews')
            .then(r => r.json())
            .then(data => {
                // Filtrar para que no haya reseñas de clientes repetidos (máx 10)
                const unique = [];
                const seen = new Set();
                for (const t of data) {
                    const id = t.client._id || t.client.id;
                    if (!seen.has(id)) {
                        seen.add(id);
                        unique.push(t);
                        if (unique.length >= 10) break;
                    }
                }
                setReviews(unique);
            })
            .catch(console.error);
    }, []);

    const settings = {
        dots: false,
        arrows: true,
        infinite: reviews.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 960,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Lo que dicen nuestros clientes
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Slider {...settings}>
                    {reviews.map((t, i) => (
                        <Box key={i} sx={{ px: 2 }}>
                            <Box
                                sx={{
                                    maxWidth: 360,
                                    mx: 'auto',
                                    textAlign: 'center',
                                    p: 3,
                                    border: '1px solid',
                                    borderColor: 'grey.300',
                                    borderRadius: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Avatar
                                    src={t.client.avatar}
                                    sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }}
                                />
                                <Typography variant="subtitle1" gutterBottom>
                                    {t.client.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    paragraph
                                    sx={{ flexGrow: 1 }}
                                >
                                    “{t.comment}”
                                </Typography>
                                <Typography variant="body2">
                                    {Array.from({ length: t.rating })
                                        .map(() => '⭐')
                                        .join('')}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Slider>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                {token ? (
                    <Button component={Link} to="/review" variant="contained">
                        Déjanos tu opinión
                    </Button>
                ) : (
                    <Button component={Link} to="/login" variant="outlined">
                        Inicia sesión para opinar
                    </Button>
                )}
            </Box>
        </Container>
    );
}
