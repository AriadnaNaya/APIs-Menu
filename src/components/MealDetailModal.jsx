// src/components/MealDetailModal.jsx

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
    Button,
    Fade
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MealDetailModal = ({ open, onClose, meal, onPrev, onNext }) => {
    if (!meal) return null;
    const [fadeKey, setFadeKey] = useState(0);

    useEffect(() => {
        setFadeKey((prev) => prev + 1);
    }, [meal]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            TransitionComponent={Fade}
            transitionDuration={300}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{meal.nombre}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }}>
                <Fade in timeout={300} key={fadeKey}>
                    <Box>
                        {meal.img && (
                            <Box
                                component="img"
                                src={meal.img}
                                alt={meal.nombre}
                                sx={{
                                    width: '100%',
                                    height: 250,            // Altura fija
                                    objectFit: 'cover',     // Para que se recorte y mantenga proporción
                                    borderRadius: 2,
                                    mb: 2
                                }}
                            />
                        )}

                        <Typography variant="h6" color="primary" fontWeight="bold">
                            {typeof meal.precio === 'number'
                                ? meal.precio.toLocaleString('es-AR', {
                                    style: 'currency',
                                    currency: 'ARS',
                                    minimumFractionDigits: 0
                                })
                                : meal.precio}
                        </Typography>

                        {meal.descripcion && (
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {meal.descripcion}
                            </Typography>
                        )}

                        {meal.variantes && meal.variantes.length > 0 && (
                            <Box mt={3}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    Opciones
                                </Typography>
                                <Box
                                    component="ul"
                                    sx={{
                                        listStyle: 'none',
                                        p: 0,
                                        m: 0,
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1
                                    }}
                                >
                                    {meal.variantes.map((op, i) => (
                                        <Box
                                            component="li"
                                            key={i}
                                            sx={{
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 16,
                                                bgcolor: 'primary.main',
                                                color: 'primary.contrastText',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {op.cantidad} —{' '}
                                            {op.precio.toLocaleString('es-AR', {
                                                style: 'currency',
                                                currency: 'ARS',
                                                minimumFractionDigits: 0
                                            })}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )}

                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Button
                                onClick={onPrev}
                                startIcon={<ArrowBackIosNewIcon />}
                                sx={{
                                    textTransform: 'none'
                                }}
                            >
                                Anterior
                            </Button>
                            <Button
                                onClick={onNext}
                                endIcon={<ArrowForwardIosIcon />}
                                sx={{
                                    textTransform: 'none'
                                }}
                            >
                                Siguiente
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </DialogContent>
        </Dialog>
    );
};

export default MealDetailModal;
