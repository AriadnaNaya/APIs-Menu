import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert
} from '@mui/material';

export default function Reservas() {
    const [form, setForm] = useState({
        name: '',
        datetime: '',
        people: '',
        contact: ''
    });
    const [error, setError]   = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    datetime: form.datetime,
                    people: Number(form.people),
                    contact: form.contact
                })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            await res.json();
            setSuccess(true);
            setForm({ name: '', datetime: '', people: '', contact: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container sx={{ py: 6, maxWidth: 600 }}>
            <Typography variant="h3" gutterBottom>Reservas</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>
                Reserva creada con éxito.
            </Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    label="Nombre"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Fecha y hora"
                    name="datetime"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={form.datetime}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Personas"
                    name="people"
                    type="number"
                    value={form.people}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Contacto (email o teléfono)"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <Button variant="contained" size="large" type="submit" sx={{ mt: 3 }}>
                    Enviar reserva
                </Button>
            </Box>
        </Container>
    );
}
