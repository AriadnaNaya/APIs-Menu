import React, { useState } from 'react';
import {
    Container, Typography, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, Button
} from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function getSlotsForDate(date) {
    const slots = [];
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    for (let h = 12; h < 16; h++) {
        for (let min of [0, 30]) {
            if (h === 15 && min === 30) continue;
            slots.push(new Date(y, m, d, h, min, 0, 0));
        }
    }
    for (let h = 19; h < 24; h++) {
        for (let min of [0, 30]) {
            slots.push(new Date(y, m, d, h, min, 0, 0));
        }
    }
    return slots;
}

export default function AdminSlots() {
    const { token, client } = useContext(AuthContext);
    const [from, setFrom] = useState(() => new Date().toISOString().slice(0, 10));
    const [to, setTo] = useState(() => new Date().toISOString().slice(0, 10));
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSlots = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/reservations/slots?from=${from}T00:00:00&to=${to}T23:59:59`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (!res.ok) throw new Error(d.error || 'Error');
            setData(d);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Generar días del rango
    const getDays = () => {
        const days = [];
        let d = new Date(from);
        const end = new Date(to);
        while (d <= end) {
            days.push(new Date(d));
            d.setDate(d.getDate() + 1);
        }
        return days;
    };

    return (
        <Container sx={{ py: 6, minHeight: '70vh' }}>
            <Typography variant="h4" gutterBottom>
                Ocupación de reservas por slot
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    label="Desde"
                    type="date"
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    size="small"
                />
                <TextField
                    label="Hasta"
                    type="date"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    size="small"
                />
                <Button variant="contained" onClick={fetchSlots} disabled={loading}>
                    Consultar
                </Button>
            </Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {Object.keys(data).length > 0 && getDays().map(day => (
                <Box key={day.toISOString()} sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        {day.toLocaleDateString()}
                    </Typography>
                    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Horario</TableCell>
                                    <TableCell>Personas reservadas</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getSlotsForDate(day).map(slot => {
                                    const iso = slot.toISOString();
                                    const count = data[iso] || 0;
                                    return (
                                        <TableRow key={iso} sx={{ bgcolor: count >= 30 ? 'error.light' : undefined }}>
                                            <TableCell>{slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                            <TableCell>{count} {count >= 30 ? ' (Lleno)' : ''}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ))}
        </Container>
    );
} 