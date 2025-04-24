// src/components/MealDetailModal.jsx

import React, { useState, useEffect } from 'react';
import { Fade } from '@mui/material';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
    Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MealDetailModal = ({ open, onClose, meal, onPrev, onNext }) => {
    if (!meal) return null;
    const [fadeKey, setFadeKey] = useState(0);

    useEffect(() => {
        setFadeKey(prev => prev + 1); // reinicia la animación al cambiar de meal
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
                            <img
                                src={meal.img}
                                alt={meal.nombre}
                                style={{
                                    width: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain',       // muestra la imagen completa
                                    borderRadius: '8px',
                                    marginBottom: '16px',
                                    backgroundColor: '#fafafa'  // fondo neutral opcional
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
                            <div className="meal-variantes">
                                <Typography variant="h6" sx={{ mt: 2 }}>Opciones</Typography>
                                <Box
                                    component="ul"
                                    sx={{
                                        mt: 1,
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1,
                                        pl: 2,
                                        listStyle: 'none'
                                    }}
                                >
                                    {meal.variantes.map((opcion, index) => (
                                        <Box
                                            component="li"
                                            key={index}
                                            sx={{
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: '999px',
                                                bgcolor: 'primary.main',
                                                color: '#fff',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            {opcion.cantidad} – ${opcion.precio.toLocaleString('es-AR')}
                                        </Box>
                                    ))}
                                </Box>
                            </div>
                        )}

                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Button
                                onClick={onPrev}
                                startIcon={<ArrowBackIosNewIcon />}
                                sx={{
                                    transition: 'transform 0.2s ease',
                                    '&:hover': { transform: 'scale(1.1)' }
                                }}
                            >
                                Anterior
                            </Button>
                            <Button
                                onClick={onNext}
                                endIcon={<ArrowForwardIosIcon />}
                                sx={{
                                    transition: 'transform 0.2s ease',
                                    '&:hover': { transform: 'scale(1.1)' }
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