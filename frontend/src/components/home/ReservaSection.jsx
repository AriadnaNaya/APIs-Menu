import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ReservaSection() {
    return (
        <Container sx={{ py: 8, textAlign: 'center', bgcolor: 'grey.50' }}>
            <Typography variant="h4" gutterBottom>
                ¿Listo para reservar?
            </Typography>
            <Typography paragraph>
                Reserva tu mesa ahora y vive una experiencia gastronómica única.
            </Typography>
            <Box>
                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/reservas"
                >
                    Hacer reserva
                </Button>
            </Box>
        </Container>
    );
}
