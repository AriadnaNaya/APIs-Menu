import React, { useEffect, useState, useContext } from 'react';
import {
    Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, Avatar, MenuItem, Card, CardContent, CardActions, 
    useMediaQuery, useTheme, Chip
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useMobile from '../utils/useMobile';

const ROLES = [
    { value: 'client', label: 'Cliente' },
    { value: 'admin', label: 'Admin' }
];

export default function AdminUsuarios() {
    const { token } = useContext(AuthContext);
    const isMobile = useMobile();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
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

    // Componente Card para mobile
    const UserCard = ({ user }) => (
        <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
            <CardContent sx={{ pb: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                        src={user.avatar}
                        alt={user.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                    >
                        {!user.avatar && <PersonIcon />}
                    </Avatar>
                    <Box flex={1}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {user.contact}
                        </Typography>
                        <Chip
                            icon={user.role === 'admin' ? <AdminPanelSettingsIcon /> : <PersonIcon />}
                            label={user.role === 'admin' ? 'Administrador' : 'Cliente'}
                            color={user.role === 'admin' ? 'primary' : 'default'}
                            size="small"
                            variant={user.role === 'admin' ? 'filled' : 'outlined'}
                        />
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                <IconButton 
                    onClick={() => handleOpen(user)}
                    size="small"
                    sx={{ color: 'primary.main' }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton 
                    color="error" 
                    onClick={() => { setDeleteId(user._id); setDeleteDialog(true); }}
                    size="small"
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );

    return (
        <Box sx={{ 
            p: isMobile ? 2 : 4, 
            maxWidth: isMobile ? '100%' : 1000, 
            mx: 'auto', 
            minHeight: '60vh' 
        }}>
            <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ mb: 3 }}>
                Administración de Usuarios
            </Typography>
            
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddOpen}
                    size={isMobile ? "small" : "medium"}
                >
                    Agregar Usuario
                </Button>
                {users.length > 0 && (
                    <Typography variant="body2" color="text.secondary">
                        {users.length} usuarios
                    </Typography>
                )}
            </Box>
            
            {/* Vista Mobile - Cards */}
            {isMobile ? (
                <Box>
                    {users.map(user => (
                        <UserCard key={user._id} user={user} />
                    ))}
                </Box>
            ) : (
                /* Vista Desktop/Tablet - Tabla */
                <TableContainer 
                    component={Paper} 
                    sx={{ 
                        mb: 4, 
                        borderRadius: 3, 
                        boxShadow: 2,
                        overflowX: 'auto'
                    }}
                >
                    <Table sx={{ minWidth: isTablet ? 600 : 500 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Usuario</TableCell>
                                {!isTablet && <TableCell sx={{ fontWeight: 'bold' }}>Contacto</TableCell>}
                                <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user._id} hover>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Avatar
                                                src={user.avatar}
                                                alt={user.name}
                                                sx={{ width: 44, height: 44, mr: 2 }}
                                            >
                                                {!user.avatar && <PersonIcon />}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {user.name}
                                                </Typography>
                                                {isTablet && (
                                                    <Typography variant="caption" color="text.secondary">
                                                        {user.contact}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    {!isTablet && (
                                        <TableCell>
                                            <Typography variant="body2">
                                                {user.contact}
                                            </Typography>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Chip
                                            icon={user.role === 'admin' ? <AdminPanelSettingsIcon /> : <PersonIcon />}
                                            label={user.role === 'admin' ? 'Admin' : 'Cliente'}
                                            color={user.role === 'admin' ? 'primary' : 'default'}
                                            size="small"
                                            variant={user.role === 'admin' ? 'filled' : 'outlined'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            <IconButton 
                                                onClick={() => handleOpen(user)}
                                                size="small"
                                                sx={{ color: 'primary.main' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                                color="error" 
                                                onClick={() => { setDeleteId(user._id); setDeleteDialog(true); }}
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Modal editar */}
            <Dialog 
                open={open} 
                onClose={handleClose} 
                maxWidth="sm" 
                fullWidth
                fullScreen={isMobile}
                PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3, boxShadow: 3 } }}
            >
                <DialogTitle sx={{ pb: 1 }}>Editar Usuario</DialogTitle>
                <DialogContent sx={{ pb: 2 }}>
                    <Stack spacing={2} mt={1}>
                        <TextField 
                            label="Nombre" 
                            value={form.name} 
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
                            fullWidth 
                            required 
                            size="small" 
                        />
                        <TextField 
                            label="Contacto" 
                            value={form.contact} 
                            onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} 
                            fullWidth 
                            required 
                            size="small" 
                        />
                        <TextField 
                            label="Avatar (URL)" 
                            value={form.avatar} 
                            onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} 
                            fullWidth 
                            size="small" 
                        />
                        <TextField 
                            select 
                            label="Rol" 
                            value={form.role} 
                            onChange={e => setForm(f => ({ ...f, role: e.target.value }))} 
                            fullWidth 
                            required 
                            size="small"
                        >
                            {ROLES.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal eliminar */}
            <Dialog 
                open={deleteDialog} 
                onClose={() => setDeleteDialog(false)}
                PaperProps={{ sx: { borderRadius: 3 } }}
            >
                <DialogTitle>¿Eliminar usuario?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este usuario?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal agregar */}
            <Dialog 
                open={addOpen} 
                onClose={handleAddClose} 
                maxWidth="sm" 
                fullWidth
                fullScreen={isMobile}
                PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3, boxShadow: 3 } }}
            >
                <DialogTitle sx={{ pb: 1 }}>Agregar Usuario</DialogTitle>
                <DialogContent sx={{ pb: 2 }}>
                    <Stack spacing={2} mt={1}>
                        <TextField 
                            label="Nombre" 
                            name="name" 
                            value={addForm.name} 
                            onChange={handleAddChange} 
                            fullWidth 
                            required 
                            size="small" 
                        />
                        <TextField 
                            label="Contacto" 
                            name="contact" 
                            value={addForm.contact} 
                            onChange={handleAddChange} 
                            fullWidth 
                            required 
                            size="small" 
                        />
                        <TextField 
                            label="Avatar (URL)" 
                            name="avatar" 
                            value={addForm.avatar} 
                            onChange={handleAddChange} 
                            fullWidth 
                            size="small" 
                        />
                        <TextField 
                            select 
                            label="Rol" 
                            name="role" 
                            value={addForm.role} 
                            onChange={handleAddChange} 
                            fullWidth 
                            required 
                            size="small"
                        >
                            {ROLES.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            label="Contraseña" 
                            name="password" 
                            type="password" 
                            value={addForm.password} 
                            onChange={handleAddChange} 
                            fullWidth 
                            required 
                            size="small" 
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button onClick={handleAddClose}>Cancelar</Button>
                    <Button onClick={handleAddSave} variant="contained">
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 