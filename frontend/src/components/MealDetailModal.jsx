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

    // Campos del item
    const name = item.name || '';
    const description = item.description || '';
    const image       = item.image ||  '';
    const price       = item.price || null;
    const variants    = item.variants || [];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
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

            <DialogContent dividers>
                {/* Imagen cuadrada y centrada */}
                {image && (
                    <Box
                        sx={{
                            width: '100%',
                            // Contenedor cuadrado via padding-bottom
                            height: 0,
                            pb: '100%',
                            position: 'relative',
                            mb: 2
                        }}
                    >
                        <Box
                            component="img"
                            src={image}
                            alt={name}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 1
                            }}
                        />
                    </Box>
                )}

                {/* Descripción */}
                {description && (
                    <Typography variant="body1" paragraph>
                        {description}
                    </Typography>
                )}

                {/* Precio debajo de la descripción */}
                {price != null && (
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: 2
                        }}
                    >
                        ${price}
                    </Typography>
                )}

                {/* Lista de variantes */}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button variant="outlined" onClick={onPrev}>
                        Anterior
                    </Button>
                    <Button variant="outlined" onClick={onNext}>
                        Siguiente
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
