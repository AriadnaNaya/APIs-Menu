import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ contact: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login fallido');
            login(data.token, data.client);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container sx={{ py: 6, maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth label="Email o Teléfono"
                    name="contact" margin="normal" required
                    value={form.contact} onChange={handleChange}
                />
                <TextField
                    fullWidth label="Contraseña"
                    type="password" name="password" margin="normal" required
                    value={form.password} onChange={handleChange}
                />
                <Button
                    fullWidth variant="contained" type="submit"
                    sx={{ mt: 2 }}
                >
                    Entrar
                </Button>
            </form>
        </Container>
    );
}
