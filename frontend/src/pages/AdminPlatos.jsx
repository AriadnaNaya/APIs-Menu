import React, { useEffect, useState, useContext } from 'react';
import {
    Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Chip
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MAIN_CATEGORIES = [
    { value: 'sushi-rolls', label: 'Sushi & Rolls' },
    { value: 'comida', label: 'Comidas' },
    { value: 'bebidas', label: 'Bebidas' },
    { value: 'postres', label: 'Postres' }
];

export default function AdminPlatos() {
    const { token } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({
        name: '', description: '', price: '', image: '', category: '', mainCategory: '', variants: ''
    });
    const [deleteId, setDeleteId] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);

    // Fetch platos
    const fetchItems = () => {
        setLoading(true);
        fetch('/api/items')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => setError('Error al cargar platos'))
            .finally(() => setLoading(false));
    };
    useEffect(fetchItems, []);

    // Abrir modal para agregar o editar
    const handleOpen = (item = null) => {
        setEditItem(item);
        setForm(item ? {
            name: item.name || '',
            description: item.description || '',
            price: item.price || '',
            image: item.image || '',
            category: item.category || '',
            mainCategory: item.mainCategory || '',
            variants: item.variants ? item.variants.map(v => `${v.name}:${v.price}`).join(',') : ''
        } : { name: '', description: '', price: '', image: '', category: '', mainCategory: '', variants: '' });
        setOpen(true);
    };
    const handleClose = () => { setOpen(false); setEditItem(null); };

    // Guardar plato (nuevo o editado)
    const handleSave = async () => {
        setError(null);
        const body = {
            ...form,
            price: Number(form.price),
            variants: form.variants
                ? form.variants.split(',').map(v => {
                    const [name, price] = v.split(':');
                    return { name: name?.trim(), price: Number(price) };
                }) : []
        };
        const method = editItem ? 'PUT' : 'POST';
        const url = editItem ? `/api/items/${editItem._id}` : '/api/items';
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            setError('Error al guardar plato');
            return;
        }
        handleClose();
        fetchItems();
    };

    // Eliminar plato
    const handleDelete = async () => {
        if (!deleteId) return;
        const res = await fetch(`/api/items/${deleteId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        setDeleteDialog(false);
        setDeleteId(null);
        fetchItems();
    };

    return (
        <Box sx={{ p: 4, maxWidth: 1100, mx: 'auto', minHeight: '60vh' }}>
            <Typography variant="h4" gutterBottom>
                Administración de Platos
            </Typography>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleOpen()}>
                Agregar Plato
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 3, boxShadow: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Principal</TableCell>
                            <TableCell>Imagen</TableCell>
                            <TableCell>Variantes</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.mainCategory}</TableCell>
                                <TableCell>{item.image && <img src={item.image} alt={item.name} style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} />}</TableCell>
                                <TableCell>
                                    {item.variants && item.variants.length > 0 ? item.variants.map((v, i) => (
                                        <Chip key={i} label={`${v.name}: $${v.price}`} size="small" sx={{ mr: 0.5 }} />
                                    )) : '-'}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(item)}><EditIcon /></IconButton>
                                    <IconButton color="error" onClick={() => { setDeleteId(item._id); setDeleteDialog(true); }}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal agregar/editar */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, boxShadow: 3 } }}>
                <DialogTitle>{editItem ? 'Editar Plato' : 'Agregar Plato'}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth required size="small" />
                        <TextField label="Descripción" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} fullWidth size="small" />
                        <TextField label="Precio" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} fullWidth required size="small" />
                        <TextField label="Imagen (URL)" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} fullWidth size="small" />
                        <TextField label="Categoría" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} fullWidth required size="small" />
                        <TextField select label="Principal" value={form.mainCategory} onChange={e => setForm(f => ({ ...f, mainCategory: e.target.value }))} fullWidth required size="small">
                            {MAIN_CATEGORIES.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </TextField>
                        <TextField label="Variantes (nombre:precio,...)" value={form.variants} onChange={e => setForm(f => ({ ...f, variants: e.target.value }))} fullWidth helperText="Ej: Pequeña:1000,Grande:2000" size="small" />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained">Guardar</Button>
                </DialogActions>
            </Dialog>

            {/* Modal eliminar */}
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>¿Eliminar plato?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 