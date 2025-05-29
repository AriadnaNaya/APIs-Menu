// frontend/src/pages/Contact.jsx
import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

export default function Contact() {
    return (
        <Container sx={{ py: 6, maxWidth: 600 }}>
            <Typography variant="h3" gutterBottom>Contacto</Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField fullWidth label="Nombre" margin="normal" />
                <TextField fullWidth label="Email" margin="normal" />
                <TextField
                    fullWidth
                    label="Mensaje"
                    multiline
                    rows={4}
                    margin="normal"
                />
                <Button variant="contained" size="large" sx={{ mt: 3 }}>
                    Enviar mensaje
                </Button>
            </Box>
        </Container>
    );
}
