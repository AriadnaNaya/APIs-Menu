import React, { useEffect, useState, useContext } from 'react';
import {
    Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, MenuItem, Chip, Card, CardContent, CardActions, Grid, 
    useMediaQuery, useTheme, Avatar, Autocomplete, InputAdornment
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import useMobile from '../utils/useMobile';
import grupoCategorias from '../utils/grupoCategorias';

const MAIN_CATEGORIES = [
    { value: 'sushi-rolls', label: 'Sushi & Rolls' },
    { value: 'comida', label: 'Comidas' },
    { value: 'bebidas', label: 'Bebidas' },
    { value: 'postres', label: 'Postres' }
];

export default function AdminPlatos() {
    const { token } = useContext(AuthContext);
    const isMobile = useMobile();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [items, setItems] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({
        name: '', description: '', price: '', image: '', category: '', mainCategory: '', variants: ''
    });
    const [deleteId, setDeleteId] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [newCategoryDialog, setNewCategoryDialog] = useState(false);
    const [newCategoryForm, setNewCategoryForm] = useState({ name: '', mainCategory: '' });

    // Fetch platos y categorías
    const fetchItems = () => {
        setLoading(true);
        fetch('/api/items')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                // Extraer categorías únicas de los items existentes
                const uniqueCategories = [...new Set(data.map(item => item.category))].filter(Boolean);
                setAvailableCategories(uniqueCategories);
            })
            .catch(err => setError('Error al cargar platos'))
            .finally(() => setLoading(false));
    };
    useEffect(fetchItems, []);

    // Obtener todas las categorías (existentes + predefinidas)
    const getAllCategories = () => {
        const predefinedCategories = Object.values(grupoCategorias).flat();
        const allCategories = [...new Set([...predefinedCategories, ...availableCategories])];
        return allCategories.sort();
    };

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

    // Manejar nueva categoría
    const handleNewCategory = () => {
        setNewCategoryDialog(true);
        setNewCategoryForm({ name: '', mainCategory: form.mainCategory || '' });
    };

    const handleSaveNewCategory = () => {
        if (!newCategoryForm.name.trim() || !newCategoryForm.mainCategory) return;
        
        const newCategory = newCategoryForm.name.trim().toLowerCase().replace(/\s+/g, '');
        
        // Agregar a categorías disponibles
        setAvailableCategories(prev => [...prev, newCategory]);
        
        // Actualizar grupoCategorias dinámicamente
        if (!grupoCategorias[newCategoryForm.mainCategory]) {
            grupoCategorias[newCategoryForm.mainCategory] = [];
        }
        if (!grupoCategorias[newCategoryForm.mainCategory].includes(newCategory)) {
            grupoCategorias[newCategoryForm.mainCategory].push(newCategory);
        }
        
        // Seleccionar la nueva categoría en el formulario
        setForm(prev => ({ 
            ...prev, 
            category: newCategory,
            mainCategory: newCategoryForm.mainCategory 
        }));
        
        // Cerrar modal
        setNewCategoryDialog(false);
        setNewCategoryForm({ name: '', mainCategory: '' });
    };

    // Componente Card para mobile
    const ItemCard = ({ item }) => (
        <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
            <CardContent sx={{ pb: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    {item.image ? (
                        <Avatar
                            src={item.image}
                            alt={item.name}
                            sx={{ width: 56, height: 56, mr: 2, borderRadius: 2 }}
                        />
                    ) : (
                        <Avatar sx={{ width: 56, height: 56, mr: 2, borderRadius: 2 }}>
                            <ImageIcon />
                        </Avatar>
                    )}
                    <Box flex={1}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {item.description}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                            ${item.price}
                        </Typography>
                    </Box>
                </Box>
                
                <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            Categoría:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.category}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            Principal:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {MAIN_CATEGORIES.find(c => c.value === item.mainCategory)?.label || item.mainCategory}
                        </Typography>
                    </Box>
                    {item.variants && item.variants.length > 0 && (
                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Variantes:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {item.variants.map((v, i) => (
                                    <Chip 
                                        key={i} 
                                        label={`${v.name}: $${v.price}`} 
                                        size="small" 
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                <IconButton 
                    onClick={() => handleOpen(item)}
                    size="small"
                    sx={{ color: 'primary.main' }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton 
                    color="error" 
                    onClick={() => { setDeleteId(item._id); setDeleteDialog(true); }}
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
            maxWidth: isMobile ? '100%' : 1200, 
            mx: 'auto', 
            minHeight: '60vh' 
        }}>
            <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ mb: 3 }}>
                Administración de Platos
            </Typography>
            
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleOpen()}
                    size={isMobile ? "small" : "medium"}
                >
                    Agregar Plato
                </Button>
                {items.length > 0 && (
                    <Typography variant="body2" color="text.secondary">
                        {items.length} platos
                    </Typography>
                )}
            </Box>
            
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {/* Vista Mobile - Cards */}
            {isMobile ? (
                <Box>
                    {items.map(item => (
                        <ItemCard key={item._id} item={item} />
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
                    <Table sx={{ minWidth: isTablet ? 800 : 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                {!isTablet && <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>}
                                <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Categoría</TableCell>
                                {!isTablet && <TableCell sx={{ fontWeight: 'bold' }}>Principal</TableCell>}
                                <TableCell sx={{ fontWeight: 'bold' }}>Imagen</TableCell>
                                {!isTablet && <TableCell sx={{ fontWeight: 'bold' }}>Variantes</TableCell>}
                                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(item => (
                                <TableRow key={item._id} hover>
                                    <TableCell>
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {item.name}
                                            </Typography>
                                            {isTablet && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {item.description}
                                                </Typography>
                                            )}
                                        </Box>
                                    </TableCell>
                                    {!isTablet && (
                                        <TableCell>
                                            <Typography variant="body2" sx={{ maxWidth: 200 }}>
                                                {item.description}
                                            </Typography>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                            ${item.price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {item.category}
                                        </Typography>
                                        {isTablet && (
                                            <Typography variant="caption" color="text.secondary">
                                                {MAIN_CATEGORIES.find(c => c.value === item.mainCategory)?.label || item.mainCategory}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {!isTablet && (
                                        <TableCell>
                                            <Typography variant="body2">
                                                {MAIN_CATEGORIES.find(c => c.value === item.mainCategory)?.label || item.mainCategory}
                                            </Typography>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        {item.image ? (
                                            <Avatar
                                                src={item.image}
                                                alt={item.name}
                                                sx={{ width: 40, height: 40, borderRadius: 1 }}
                                            />
                                        ) : (
                                            <Avatar sx={{ width: 40, height: 40, borderRadius: 1 }}>
                                                <ImageIcon />
                                            </Avatar>
                                        )}
                                    </TableCell>
                                    {!isTablet && (
                                        <TableCell>
                                            <Box sx={{ maxWidth: 200 }}>
                                                {item.variants && item.variants.length > 0 ? (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {item.variants.map((v, i) => (
                                                            <Chip 
                                                                key={i} 
                                                                label={`${v.name}: $${v.price}`} 
                                                                size="small" 
                                                                variant="outlined"
                                                                sx={{ mb: 0.5 }}
                                                            />
                                                        ))}
                                                    </Box>
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Sin variantes
                                                    </Typography>
                                                )}
                                            </Box>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            <IconButton 
                                                onClick={() => handleOpen(item)}
                                                size="small"
                                                sx={{ color: 'primary.main' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                                color="error" 
                                                onClick={() => { setDeleteId(item._id); setDeleteDialog(true); }}
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

            {/* Modal agregar/editar */}
            <Dialog 
                open={open} 
                onClose={handleClose} 
                maxWidth="sm" 
                fullWidth
                fullScreen={isMobile}
                PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3, boxShadow: 3 } }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    {editItem ? 'Editar Plato' : 'Agregar Plato'}
                </DialogTitle>
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
                            label="Descripción" 
                            value={form.description} 
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))} 
                            fullWidth 
                            size="small"
                            multiline
                            rows={2}
                        />
                        <TextField 
                            label="Precio" 
                            type="number" 
                            value={form.price} 
                            onChange={e => setForm(f => ({ ...f, price: e.target.value }))} 
                            fullWidth 
                            required 
                            size="small" 
                        />
                        <TextField 
                            label="Imagen (URL)" 
                            value={form.image} 
                            onChange={e => setForm(f => ({ ...f, image: e.target.value }))} 
                            fullWidth 
                            size="small" 
                        />
                        
                        {/* Categoría con Autocomplete */}
                        <Box>
                            <Autocomplete
                                freeSolo
                                options={getAllCategories()}
                                value={form.category}
                                onInputChange={(event, newValue) => {
                                    setForm(f => ({ ...f, category: newValue || '' }));
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Categoría"
                                        required
                                        size="small"
                                        helperText="Selecciona una categoría existente o escribe una nueva"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleNewCategory}
                                                        size="small"
                                                        title="Crear nueva categoría"
                                                        sx={{ mr: params.InputProps.endAdornment ? 1 : 0 }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                    {params.InputProps.endAdornment}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                                renderOption={(props, option) => {
                                    // Encontrar en qué categoría principal está esta opción
                                    const mainCat = Object.entries(grupoCategorias).find(([key, cats]) => 
                                        cats.includes(option)
                                    );
                                    const mainCatLabel = mainCat ? 
                                        MAIN_CATEGORIES.find(c => c.value === mainCat[0])?.label : 
                                        'Personalizada';
                                    
                                    return (
                                        <Box component="li" {...props}>
                                            <Box>
                                                <Typography variant="body2">
                                                    {option}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {mainCatLabel}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                }}
                                groupBy={(option) => {
                                    const mainCat = Object.entries(grupoCategorias).find(([key, cats]) => 
                                        cats.includes(option)
                                    );
                                    return mainCat ? 
                                        MAIN_CATEGORIES.find(c => c.value === mainCat[0])?.label : 
                                        'Categorías Personalizadas';
                                }}
                            />
                        </Box>
                        
                        <TextField 
                            select 
                            label="Principal" 
                            value={form.mainCategory} 
                            onChange={e => setForm(f => ({ ...f, mainCategory: e.target.value }))} 
                            fullWidth 
                            required 
                            size="small"
                        >
                            {MAIN_CATEGORIES.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            label="Variantes (nombre:precio,...)" 
                            value={form.variants} 
                            onChange={e => setForm(f => ({ ...f, variants: e.target.value }))} 
                            fullWidth 
                            helperText="Ej: Pequeña:1000,Grande:2000" 
                            size="small"
                            multiline
                            rows={2}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal nueva categoría */}
            <Dialog 
                open={newCategoryDialog} 
                onClose={() => setNewCategoryDialog(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: { borderRadius: 3 } }}
            >
                <DialogTitle>Nueva Categoría</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField
                            label="Nombre de la categoría"
                            value={newCategoryForm.name}
                            onChange={e => setNewCategoryForm(f => ({ ...f, name: e.target.value }))}
                            fullWidth
                            required
                            size="small"
                            helperText="Ej: sushiEspecial, bebidasCalientes, etc."
                        />
                        <TextField
                            select
                            label="Categoría Principal"
                            value={newCategoryForm.mainCategory}
                            onChange={e => setNewCategoryForm(f => ({ ...f, mainCategory: e.target.value }))}
                            fullWidth
                            required
                            size="small"
                            helperText="Selecciona a qué categoría principal pertenece"
                        >
                            {MAIN_CATEGORIES.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                        {/* Mostrar categorías existentes de la categoría principal seleccionada */}
                        {newCategoryForm.mainCategory && (
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                                    Categorías existentes en {MAIN_CATEGORIES.find(c => c.value === newCategoryForm.mainCategory)?.label}:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                    {grupoCategorias[newCategoryForm.mainCategory]?.map(cat => (
                                        <Chip 
                                            key={cat} 
                                            label={cat} 
                                            size="small" 
                                            variant="outlined"
                                            sx={{ fontSize: '0.75rem' }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewCategoryDialog(false)}>Cancelar</Button>
                    <Button 
                        onClick={handleSaveNewCategory} 
                        variant="contained"
                        disabled={!newCategoryForm.name.trim() || !newCategoryForm.mainCategory}
                    >
                        Crear Categoría
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal eliminar */}
            <Dialog 
                open={deleteDialog} 
                onClose={() => setDeleteDialog(false)}
                PaperProps={{ sx: { borderRadius: 3 } }}
            >
                <DialogTitle>¿Eliminar plato?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este plato?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 