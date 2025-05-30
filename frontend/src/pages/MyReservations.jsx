import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Alert
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyReservations() {
    const { token } = useContext(AuthContext);
    const navigate  = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [error, setError]               = useState(null);

    const fetchMy = () => {
        fetch('/api/reservations/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res =>
                res.json().then(data => {
                    if (!res.ok) throw new Error(data.error || res.status);
                    return data;
                })
            )
            .then(arr => setReservations(arr))
            .catch(err => setError(err.message));
    };

    useEffect(() => {
        if (!token) return navigate('/login');
        fetchMy();
    }, [token, navigate]);

    const handleCancel = async id => {
        try {
            const res = await fetch(`/api/reservations/${id}/cancel`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || res.status);
            fetchMy();
        } catch (err) {
            setError(err.message);
        }
    };

    const computeState = r => {
        if (r.state === 'canceled') return 'Cancelada';
        return new Date(r.datetime) < new Date() ? 'Pasada' : 'Activa';
    };

    return (
        <Container
            sx={{ py: 6, minHeight: '70vh' }}
            maxWidth="md"
        >
            <Typography variant="h4" gutterBottom>
                Mis Reservas
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {reservations.length === 0 && !error && (
                <Typography sx={{ mt: 4, textAlign: 'center' }}>
                    No tienes reservas.
                </Typography>
            )}

            <List>
                {reservations.map(r => {
                    const state = computeState(r);
                    return (
                        <ListItem key={r._id} divider sx={{ alignItems: 'flex-start' }}>
                            <ListItemText
                                primary={new Date(r.datetime).toLocaleString()}
                                secondary={`Personas: ${r.people} — Estado: ${state}`}
                            />
                            {state === 'Activa' && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleCancel(r._id)}
                                >
                                    Cancelar
                                </Button>
                            )}
                        </ListItem>
                    );
                })}
            </List>
        </Container>
    );
}
