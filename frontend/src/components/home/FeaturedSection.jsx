import React from 'react';
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
    Box
} from '@mui/material';

export default function FeaturedSection() {
    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Plato del día
            </Typography>
            <Card sx={{ maxWidth: 800, mx: 'auto', boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Plato del día"
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Chow Fan Mixto
                    </Typography>
                    <Typography paragraph>
                        Salteado de arroz con vegetales, huevo y nuestro mix de carnes en salsa secreta.
                    </Typography>
                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            size="large"
                            href="/menu?category=comida"
                        >
                            Ver en el menú
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
