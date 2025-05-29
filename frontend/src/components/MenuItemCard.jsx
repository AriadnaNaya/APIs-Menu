// APIs/frontend/src/components/MenuItemCard.jsx
import React from 'react';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography
} from '@mui/material';

export default function MenuItemCard({ item, onClick }) {
    const { name, description, price, image } = item;

    return (
        <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
            <CardActionArea onClick={onClick}>
                {image && (
                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        sx={{
                            width: '100%',
                            height: 160,
                            objectFit: 'cover'
                        }}
                    />
                )}
                <CardContent>
                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                    {description && (
                        <Typography variant="body2" noWrap color="text.secondary" sx={{ mb: 1 }}>
                            {description}
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.primary">
                        ${price.toLocaleString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
