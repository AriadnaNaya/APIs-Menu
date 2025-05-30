import React, { useContext } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ReservaSection() {
    const { token } = useContext(AuthContext);
    const navigate  = useNavigate();

    const handleReserva = () => {
        if (!token) {
            alert('Debes iniciar sesión para reservar');
            navigate('/login');
        } else {
            navigate('/reserva');
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', py: 8, color: 'text.primary', textAlign: 'center' }}>
            <Container>
                <Typography variant="h4" gutterBottom>
                    ¿Listo para reservar?
                </Typography>
                <Typography paragraph>
                    Reserva tu mesa ahora y vive una experiencia gastronómica única.
                </Typography>
                <Button variant="contained" size="large" onClick={handleReserva}>
                    Hacer reserva
                </Button>
            </Container>
        </Box>
    );
}
