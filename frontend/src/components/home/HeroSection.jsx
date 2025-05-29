import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function HeroSection() {
    return (
        <Box
            sx={{
                height: '80vh',
                backgroundImage: `url("https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.4)'
                }}
            />
            <Box sx={{ position: 'relative', zIndex: 1, px: 2 }}>
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Bienvenido a Town Kitchen
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Descubre el sabor auténtico de la fusión japonés-urbana
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    href="/menu?category=sushi-rolls"
                    sx={{ mt: 3 }}
                >
                    Explorar carta
                </Button>
            </Box>
        </Box>
    );
}
