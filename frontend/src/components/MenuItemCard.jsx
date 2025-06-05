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
        <Card sx={{
            borderRadius: 3,
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
            transition: 'transform 0.18s, box-shadow 0.18s',
            '&:hover': {
                transform: 'scale(1.035)',
                boxShadow: '0 6px 24px 0 rgba(0,0,0,0.13)'
            },
            bgcolor: 'background.paper',
            height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
            <CardActionArea onClick={onClick}>
                {image && (
                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        sx={{
                            width: '100%',
                            height: 180,
                            objectFit: 'cover',
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12
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
