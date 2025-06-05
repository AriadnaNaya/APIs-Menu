import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box, Avatar, Button, useTheme } from '@mui/material';
import Slider from 'react-slick';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TestimonialSection() {
    const theme    = useTheme();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/api/reviews')
            .then(r => r.json())
            .then(data => {
                const unique = [];
                const seen = new Set();
                for (const t of data) {
                    if (!seen.has(t.client._id)) {
                        seen.add(t.client._id);
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
            { breakpoint: 960, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } }
        ]
    };

    const handleOpinion = () => {
        if (!token) {
            alert('Debes iniciar sesión para dejar tu opinión');
            navigate('/login');
        } else {
            navigate('/review');
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', py: 8, color: 'text.primary' }}>
            <Container>
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
                                        bgcolor: 'background.paper',
                                        borderRadius: 3,
                                        boxShadow: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        color: 'text.primary',
                                        minHeight: 220
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
                    <Button variant="contained" onClick={handleOpinion}>
                        Déjanos tu opinión
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
