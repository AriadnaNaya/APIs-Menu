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
            .then(setReviews)
            .catch(console.error);
    }, []);

    const settings = {
        dots: true, infinite: true, speed: 500,
        slidesToShow: 1, slidesToScroll: 1,
        arrows: true, autoplay: true, autoplaySpeed: 5000
    };

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Lo que dicen nuestros clientes
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
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
            <Box sx={{ mt: 4 }}>
                <Slider {...settings}>
                    {reviews.map((t,i) => (
                        <Box key={i} sx={{ px: 2 }}>
                            <Box
                                sx={{
                                    maxWidth: 600,
                                    mx: 'auto',
                                    textAlign: 'center',
                                    p: 3,
                                    border: '1px solid',
                                    borderColor: 'grey.300',
                                    borderRadius: 2
                                }}
                            >
                                <Avatar
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.client.name)}`}
                                    sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }}
                                />
                                <Typography variant="subtitle1" gutterBottom>
                                    {t.client.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    “{t.comment}”
                                </Typography>
                                <Typography variant="body2">
                                    {Array.from({ length: t.rating }).map((_, ix) => '⭐').join('')}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Container>
    );
}
