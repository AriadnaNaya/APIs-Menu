import React, { useEffect, useState, useContext } from 'react';
import {
    Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, MenuItem
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ROLES = [
    { value: 'client', label: 'Cliente' },
    { value: 'admin', label: 'Admin' }
];

export default function AdminUsuarios() {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [form, setForm] = useState({ name: '', contact: '', avatar: '', role: 'client' });
    const [deleteId, setDeleteId] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [addForm, setAddForm] = useState({ name: '', contact: '', avatar: '', role: 'client', password: '' });

    // Fetch users
    const fetchUsers = () => {
        setLoading(true);
        fetch('/api/auth/clients', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => setError('Error al cargar usuarios'))
            .finally(() => setLoading(false));
    };
    useEffect(fetchUsers, [token]);

    // Abrir modal para editar
    const handleOpen = (user) => {
        setEditUser(user);
        setForm(user ? {
            name: user.name || '',
            contact: user.contact || '',
            avatar: user.avatar || '',
            role: user.role || 'client'
        } : { name: '', contact: '', avatar: '', role: 'client' });
        setOpen(true);
    };
    const handleClose = () => { setOpen(false); setEditUser(null); };

    // Guardar usuario editado
    const handleSave = async () => {
        setError(null);
        const res = await fetch(`/api/auth/clients/${editUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });
        if (!res.ok) {
            setError('Error al guardar usuario');
            return;
        }
        handleClose();
        fetchUsers();
    };

    // Eliminar usuario
    const handleDelete = async () => {
        if (!deleteId) return;
        const res = await fetch(`/api/auth/clients/${deleteId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        setDeleteDialog(false);
        setDeleteId(null);
        fetchUsers();
    };

    const handleAddOpen = () => { setAddOpen(true); setAddForm({ name: '', contact: '', avatar: '', role: 'client', password: '' }); };
    const handleAddClose = () => setAddOpen(false);
    const handleAddChange = e => setAddForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleAddSave = async () => {
        try {
            const res = await fetch('/api/auth/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(addForm)
            });
            if (!res.ok) throw new Error('Error al crear usuario');
            setAddOpen(false);
            fetchUsers();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 900, mx: 'auto', minHeight: '60vh' }}>
            <Typography variant="h4" gutterBottom>
                Administración de Usuarios
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Stack direction="row" justifyContent="flex-end" mb={2}>
                <Button variant="contained" color="primary" onClick={handleAddOpen}>Agregar Usuario</Button>
            </Stack>
            <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 3, boxShadow: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Contacto</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user._id}>
                                <TableCell><Avatar src={user.avatar} alt={user.name} sx={{ width: 44, height: 44, boxShadow: 1 }} /></TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.contact}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(user)}><EditIcon /></IconButton>
                                    <IconButton color="error" onClick={() => { setDeleteId(user._id); setDeleteDialog(true); }}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal editar */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, boxShadow: 3 } }}>
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth required size="small" />
                        <TextField label="Contacto" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} fullWidth required size="small" />
                        <TextField label="Avatar (URL)" value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} fullWidth size="small" />
                        <TextField select label="Rol" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} fullWidth required size="small">
                            {ROLES.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained">Guardar</Button>
                </DialogActions>
            </Dialog>

            {/* Modal eliminar */}
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>¿Eliminar usuario?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={addOpen} onClose={handleAddClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, boxShadow: 3 } }}>
                <DialogTitle>Agregar Usuario</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Nombre" name="name" value={addForm.name} onChange={handleAddChange} fullWidth required size="small" />
                        <TextField label="Contacto" name="contact" value={addForm.contact} onChange={handleAddChange} fullWidth required size="small" />
                        <TextField label="Avatar (URL)" name="avatar" value={addForm.avatar} onChange={handleAddChange} fullWidth size="small" />
                        <TextField select label="Rol" name="role" value={addForm.role} onChange={handleAddChange} fullWidth required size="small">
                            {ROLES.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </TextField>
                        <TextField label="Contraseña" name="password" type="password" value={addForm.password} onChange={handleAddChange} fullWidth required size="small" />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancelar</Button>
                    <Button onClick={handleAddSave} variant="contained">Crear</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 