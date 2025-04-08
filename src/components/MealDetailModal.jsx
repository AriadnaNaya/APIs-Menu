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
        setFadeKey(prev => prev + 1); // cada vez que cambia el meal, fuerza reinicio de Fade
    }, [meal]);
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            TransitionComponent={Fade}
            transitionDuration={300} // ajustable
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{meal.nombre}</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
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
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '16px'
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
                                <h4>Opciones</h4>
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {meal.variantes.map((opcion, index) => (
                                        <li
                                            key={index}
                                            className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400"
                                        >
                                            {opcion.cantidad} - ${opcion.precio.toLocaleString('es-AR')}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Button
                                onClick={onPrev}
                                startIcon={<ArrowBackIosNewIcon/>}
                                sx={{
                                    transition: 'transform 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
                                Anterior
                            </Button>
                            <Button
                                onClick={onNext}
                                endIcon={<ArrowForwardIosIcon />}
                                sx={{
                                    transition: 'transform 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
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
