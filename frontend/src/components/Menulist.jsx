// src/components/MenuList.jsx
import React from 'react';
import { Box } from '@mui/material';
import MenuItemCard from './MenuItemCard';

const MenuList = ({ meals, onMealClick }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',                                  // 1 columna en pantallas muy pequeñas
        sm: 'repeat(auto-fill, minmax(360px, 1fr))' // columnas de mínimo 360px
      },
      gap: 2                                       // espacio uniforme entre cards
    }}
  >
    {meals.map((meal, index) => (
      <MenuItemCard
        key={index}
        meal={meal}
        isExpanded={false}
        onToggle={() => onMealClick(meal)}
      />
    ))}
  </Box>
);

export default React.memo(MenuList);
