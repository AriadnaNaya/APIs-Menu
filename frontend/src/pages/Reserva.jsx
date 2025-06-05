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
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

export default function Reserva() {
    const { token } = useContext(AuthContext);
    const navigate  = useNavigate();
    const [form, setForm]       = useState({ datetime: '', people: '' });
    const [error, setError]     = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (!token) {
            alert('Debes iniciar sesión para reservar');
            navigate('/login');
        }
    }, [token, navigate]);

    // Generar slots válidos para el día seleccionado
    const getSlotsForDate = (date) => {
        const slots = [];
        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();
        // Almuerzo: 12:00 a 15:30
        for (let h = 12; h < 16; h++) {
            for (let min of [0, 30]) {
                if (h === 15 && min === 30) continue; // 16:00 no es válido
                slots.push(new Date(y, m, d, h, min, 0, 0));
            }
        }
        // Cena: 19:00 a 23:30
        for (let h = 19; h < 24; h++) {
            for (let min of [0, 30]) {
                slots.push(new Date(y, m, d, h, min, 0, 0));
            }
        }
        return slots;
    };

    // Consultar al backend los slots ocupados para el día seleccionado
    const fetchSlots = async (date) => {
        setLoadingSlots(true);
        const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
        const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        const res = await fetch(`/api/reservations?from=${dayStart.toISOString()}&to=${dayEnd.toISOString()}`);
        const all = await res.json();
        setLoadingSlots(false);
        return all;
    };

    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        now.setHours(now.getHours() + 1, 0, 0, 0);
        return now.toISOString().slice(0, 10);
    });
    const [slots, setSlots] = useState([]);
    const [disabledSlots, setDisabledSlots] = useState([]);

    useEffect(() => {
        // Cuando cambia la fecha, actualiza los slots disponibles
        const date = new Date(selectedDate);
        setSlots(getSlotsForDate(date));
        fetchSlots(date).then(all => {
            // Calcular ocupación por slot
            const slotMap = {};
            getSlotsForDate(date).forEach(slot => {
                slotMap[slot.toISOString()] = 0;
            });
            all.forEach(r => {
                const dt = new Date(r.datetime);
                const slotKey = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), 0, 0).toISOString();
                slotMap[slotKey] = (slotMap[slotKey] || 0) + (r.people || 0);
            });
            setDisabledSlots(Object.entries(slotMap).filter(([k, v]) => v >= 70).map(([k]) => k));
        });
    }, [selectedDate]);

    const handleDateChange = e => {
        setSelectedDate(e.target.value);
        setForm(f => ({ ...f, datetime: '' }));
    };
    const handleSlotChange = e => {
        setForm(f => ({ ...f, datetime: e.target.value }));
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.datetime || !form.people) {
            return 'Todos los campos son obligatorios';
        }
        // Usar hora local del slot seleccionado (sin offset extra)
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
                    label="Fecha"
                    name="date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={selectedDate}
                    onChange={handleDateChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    select
                    label="Horario"
                    name="datetime"
                    value={form.datetime}
                    onChange={handleSlotChange}
                    margin="normal"
                    required
                    disabled={loadingSlots}
                    helperText={loadingSlots ? 'Cargando horarios...' : ''}
                >
                    {slots.map(slot => {
                        // Construir string local YYYY-MM-DDTHH:mm
                        const localStr = slot.getFullYear() + '-' +
                            String(slot.getMonth() + 1).padStart(2, '0') + '-' +
                            String(slot.getDate()).padStart(2, '0') + 'T' +
                            String(slot.getHours()).padStart(2, '0') + ':' +
                            String(slot.getMinutes()).padStart(2, '0');
                        const label = slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        // Para disabled, sigue usando el ISO para comparar
                        const iso = slot.toISOString();
                        return (
                            <MenuItem key={iso} value={localStr} disabled={disabledSlots.includes(iso)}>
                                {label} {disabledSlots.includes(iso) ? '— No disponible' : ''}
                            </MenuItem>
                        );
                    })}
                </TextField>
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
