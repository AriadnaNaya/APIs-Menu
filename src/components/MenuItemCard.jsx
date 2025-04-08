import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Collapse
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MenuItemCard = ({ meal, isExpanded, onToggle }) => {
    const hasVariants = meal.variantes && meal.variantes.length > 0;

    return (
        <Card
            className="meal-card"
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: 350,
                border: '1px solid #00c886',
                borderRadius: 2,
                boxShadow: 'none'
            }}
            onClick={onToggle}
        >
            {meal.img && (
                <CardMedia
                    component="img"
                    sx={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        margin: 1,
                        borderRadius: 1
                    }}
                    image={meal.img}
                    alt={meal.nombre}
                    loading="lazy"
                />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ p: 1, pb: 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 0.5
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                            {meal.nombre}
                        </Typography>
                        {hasVariants ? (
                            <KeyboardArrowDownIcon
                                sx={{
                                    transition: 'transform 0.3s',
                                    transform: isExpanded ? 'rotate(180deg)' : 'none',
                                    color: '#888'
                                }}
                            />
                        ) : (
                            meal.precio && (
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#00c886' }}>
                                    {typeof meal.precio === 'number'
                                        ? meal.precio.toLocaleString('es-AR', {
                                            style: 'currency',
                                            currency: 'ARS',
                                            minimumFractionDigits: 0
                                        })
                                        : meal.precio}
                                </Typography>
                            )
                        )}
                    </Box>
                    {meal.descripcion?.toLowerCase() !== 'sin descripción' && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {meal.descripcion}
                        </Typography>
                    )}
                </CardContent>
            </Box>
        </Card>
    );
};

MenuItemCard.propTypes = {
    meal: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        img: PropTypes.string,
        descripcion: PropTypes.string,
        precio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        variantes: PropTypes.arrayOf(
            PropTypes.shape({
                cantidad: PropTypes.string.isRequired,
                precio: PropTypes.number.isRequired,
                descripcion: PropTypes.string
            })
        )
    }).isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default React.memo(MenuItemCard);
