import React, { useState, useContext, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Reserva() {
    const { token } = useContext(AuthContext);
    const navigate  = useNavigate();
    const [form, setForm]       = useState({ datetime: '', people: '' });
    const [error, setError]     = useState(null);

    useEffect(() => {
        if (!token) {
            alert('Debes iniciar sesión para reservar');
            navigate('/login');
        }
    }, [token, navigate]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.datetime || !form.people) {
            return 'Todos los campos son obligatorios';
        }
        const dt = new Date(form.datetime);
        const h  = dt.getHours();
        const m  = dt.getMinutes();
        const dayOk =
            (h >= 12 && h < 16) ||
            (h >= 19 && h < 24);
        const minuteOk = m === 0 || m === 30;
        if (!dayOk) {
            return 'Solo puedes reservar de 12:00–16:00 o 19:00–00:00';
        }
        if (!minuteOk) {
            return 'Selecciona horario en intervalos de 30 minutos';
        }
        return null;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        const msg = validate();
        if (msg) {
            setError(msg);
            return;
        }
        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    datetime: form.datetime,
                    people:   Number(form.people)
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
            alert('¡Reserva creada!');
            navigate('/mis-reservas');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container sx={{ py: 6, maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom>
                Hacer Reserva
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    label="Fecha y hora"
                    name="datetime"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 1800 }}
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
                <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                    Reservar
                </Button>
            </Box>
        </Container>
    );
}
