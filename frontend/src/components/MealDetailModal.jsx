// frontend/src/components/MealDetailModal.jsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    Typography,
    Box,
    useMediaQuery,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function MealDetailModal({
                                            open,
                                            item,
                                            onClose,
                                            onPrev,
                                            onNext
                                        }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (!item) return null;

    const name        = item.nombre || item.name || '';
    const description = item.descripcion || item.description || '';
    const image       = item.img || item.image || item.imageUrl || '';
    const price       = item.precio || item.price || null;
    const variants    = item.variantes || item.variants || [];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }}>
                {name}
                <IconButton
                    autoFocus
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 2 }}>
                {/* Imagen cuadrada ligeramente más grande */}
                {image && (
                    <Box
                        component="img"
                        src={image}
                        alt={name}
                        sx={{
                            display: 'block',
                            width: { xs: 180, sm: 250 },
                            height: { xs: 180, sm: 250 },
                            objectFit: 'cover',
                            borderRadius: 3,
                            mx: 'auto',
                            mb: 2,
                            boxShadow: 2
                        }}
                    />
                )}

                {/* Descripción */}
                {description && (
                    <Typography variant="body2" paragraph>
                        {description}
                    </Typography>
                )}

                {/* Precio debajo de la descripción */}
                {price != null && (
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: 2
                        }}
                    >
                        ${price}
                    </Typography>
                )}

                {/* Variantes */}
                {variants.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        {variants.map((v, i) => {
                            const qty = v.cantidad || v.quantity || '';
                            const pr  = v.precio   || v.price    || '';
                            return (
                                <Typography key={i} variant="body2">
                                    – {qty}: ${pr}
                                </Typography>
                            );
                        })}
                    </Box>
                )}

                {/* Botones Anterior / Siguiente */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Button size="small" variant="outlined" onClick={onPrev}>
                        Anterior
                    </Button>
                    <Button size="small" variant="outlined" onClick={onNext}>
                        Siguiente
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
