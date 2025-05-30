// frontend/src/pages/MyReviews.jsx
import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Rating,
    Alert
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyReviews() {
    const { token } = useContext(AuthContext);
    const navigate  = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        if (!token) return navigate('/login');
        fetch('/api/reviews/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res =>
                res.json().then(data => {
                    if (!res.ok) throw new Error(data.error || res.status);
                    return data;
                })
            )
            .then(setReviews)
            .catch(err => setError(err.message));
    }, [token, navigate]);

    return (
        <Container
            sx={{
                py: 6,
                // Ocupa al menos 70vh para empujar el footer abajo
                minHeight: '70vh'
            }}
            maxWidth="md"
        >
            <Typography variant="h4" gutterBottom>
                Mis Reseñas
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {!error && reviews.length === 0 && (
                <Typography sx={{ mt: 4, textAlign: 'center' }}>
                    No tienes reseñas.
                </Typography>
            )}

            <List>
                {reviews.map(r => (
                    <ListItem key={r._id} alignItems="flex-start" divider>
                        <Rating value={r.rating} readOnly />
                        <ListItemText
                            primary={r.comment}
                            sx={{ ml: 1 }}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}
