import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';

export default function StorySection() {
    return (
        <Container sx={{ py: 8, bgcolor: 'grey.100' }}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                        alt="Nuestra historia"
                        sx={{
                            width: '100%',
                            maxHeight: 400,
                            objectFit: 'cover',
                            borderRadius: 2
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        Nuestra historia
                    </Typography>
                    <Typography paragraph>
                        Desde 2010, Town Kitchen fusiona técnicas tradicionales japonesas con ingredientes de la
                        mejor calidad. Fundado por apasionados de la gastronomía, nuestro objetivo es llevarte
                        en un viaje de sabores que combine lo clásico y lo contemporáneo.
                    </Typography>
                    <Typography paragraph>
                        Nuestro sushi se prepara al momento por chefs experimentados, y nuestra barra de bebidas
                        ofrece desde mocktails hasta sake premium.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
