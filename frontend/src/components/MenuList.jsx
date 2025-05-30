// frontend/src/components/MenuList.jsx
import React from 'react';
import { Grid } from '@mui/material';
import MenuItemCard from './MenuItemCard';

const MenuList = ({ items, onItemClick }) => (
    <Grid container spacing={2}>
        {items.map(item => (
            <Grid item key={item._id || item.id} xs={12} sm={6} md={4} lg={3}>
                <MenuItemCard item={item} onClick={() => onItemClick(item)} />
            </Grid>
        ))}
    </Grid>
);

export default MenuList;
