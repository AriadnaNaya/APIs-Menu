// frontend/src/pages/Profile.jsx
import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Alert,
    Avatar,
    Box,
    Stack
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { token, client, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        name: '',
        contact: '',
        password: '',
        avatar: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Inicializar datos del formulario desde el cliente
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        setForm({
            name: client.name,
            contact: client.contact,
            password: '',
            avatar: client.avatar
        });
    }, [token, client, navigate]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => {
        setError(null);
        setSuccess(false);
        setIsEditing(true);
    };

    const handleCancel = () => {
        // Restaurar valores originales
        setForm({
            name: client.name,
            contact: client.contact,
            password: '',
            avatar: client.avatar
        });
        setError(null);
        setSuccess(false);
        setIsEditing(false);
    };

    const handleSave = async e => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch('/api/auth/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
            // Actualizar contexto con nuevos datos
            login(token, data.client);
            setSuccess(true);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container sx={{ py: 6, maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom>
                Mi Perfil
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Perfil actualizado.
                </Alert>
            )}

            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                    src={form.avatar}
                    alt={form.name}
                    sx={{ width: 100, height: 100, mx: 'auto' }}
                />
            </Box>

            {isEditing ? (
                <Box component="form" onSubmit={handleSave} noValidate>
                    <TextField
                        fullWidth
                        label="URL de avatar"
                        name="avatar"
                        margin="normal"
                        value={form.avatar}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="name"
                        margin="normal"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="contact"
                        type="email"
                        margin="normal"
                        required
                        value={form.contact}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Nueva contraseña"
                        name="password"
                        type="password"
                        margin="normal"
                        helperText="Dejar en blanco para mantener la actual"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button variant="contained" fullWidth type="submit">
                            Guardar
                        </Button>
                        <Button variant="outlined" fullWidth onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            ) : (
                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Nombre:</strong> {client.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Email:</strong> {client.contact}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleEditClick}
                        sx={{ mt: 2 }}
                        fullWidth
                    >
                        Editar
                    </Button>
                </Box>
            )}
        </Container>
    );
}
