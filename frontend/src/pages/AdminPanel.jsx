import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';

const AdminPanel = () => {
    const { client } = useContext(AuthContext);

    if (!client || client.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <Box
            sx={{
                p: 4,
                maxWidth: 600,
                mx: 'auto',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <Typography variant="h4" gutterBottom>
                Panel de Control
            </Typography>

            <Typography variant="body1" gutterBottom>
                Bienvenido, {client.name}. Seleccioná una opción para administrar el sistema:
            </Typography>

            <Stack spacing={3} mt={4}>
                <Button
                    variant="contained"
                    component={Link}
                    to="/admin/platos"
                    sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        fontSize: '18px',
                        padding: '12px 24px',
                        zIndex: 9999
                    }}
                >
                    Administración de platos
                </Button>
                <Button variant="contained" color="secondary" component={Link} to="/admin/usuarios">
                    Administración de usuarios
                </Button>
            </Stack>
        </Box>
    );
};

export default AdminPanel;
