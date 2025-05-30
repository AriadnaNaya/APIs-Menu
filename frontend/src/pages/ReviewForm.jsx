import React, { useState, useContext, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Alert
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ReviewForm() {
    const { token } = useContext(AuthContext);
    const navigate  = useNavigate();
    const [form, setForm]       = useState({ rating: 5, comment: '' });
    const [error, setError]     = useState(null);

    useEffect(() => {
        if (!token) {
            alert('Debes iniciar sesión para dejar tu opinión');
            navigate('/login');
        }
    }, [token, navigate]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
            alert('¡Gracias por tu reseña!');
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container sx={{ py: 6, maxWidth: 600 }}>
            <Typography variant="h4" gutterBottom>
                Déjanos tu opinión
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    select
                    label="Calificación"
                    name="rating"
                    margin="normal"
                    SelectProps={{ native: true }}
                    value={form.rating}
                    onChange={handleChange}
                >
                    {[1, 2, 3, 4, 5].map(v => (
                        <option key={v} value={v}>
                            {v} ⭐
                        </option>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    label="Comentario"
                    name="comment"
                    multiline
                    rows={4}
                    margin="normal"
                    required
                    value={form.comment}
                    onChange={handleChange}
                />
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    Enviar reseña
                </Button>
            </form>
        </Container>
    );
}
