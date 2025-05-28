// src/components/MenuItemCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box
} from '@mui/material';

const MenuItemCard = ({ meal, isExpanded, onToggle }) => {
  const hasVariants = meal.variantes && meal.variantes.length > 0;

  return (
    <Card
      sx={{
        // En pantallas muy pequeñas ocupa el 100%, en sm+ fija 360px
        width: { xs: '100%', sm: 360 },
        maxWidth: 360,
        height: 130,
        display: 'flex',
        border: '1px solid #00c886',
        borderRadius: 2,
        boxShadow: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 8px 20px rgba(0, 200, 134, 0.15)'
        }
      }}
      onClick={onToggle}
    >
      {meal.img && (
        <CardMedia
          component="img"
          image={meal.img}
          alt={meal.nombre}
          loading="lazy"
          sx={{
            width: { xs: 80, sm: 100 }, // ajustar imagen en xs
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          p: 1,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {meal.nombre}
          </Typography>
          {meal.precio && (
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: '#00c886',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              {typeof meal.precio === 'number'
                ? meal.precio.toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                    minimumFractionDigits: 0
                  })
                : meal.precio}
            </Typography>
          )}
        </Box>
        {meal.descripcion?.toLowerCase() !== 'sin descripción' && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            {meal.descripcion}
          </Typography>
        )}
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
