import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Container,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../components/Header';
import MenuList from '../components/MenuList';
import data from '../data/menuData';
import formatTitle from '../utils/formatTitle';
import grupoCategorias from '../utils/grupoCategorias';

const Menu = ({ category: propCategory }) => {
    // Usa la prop "category" si se pasa, o bien el parámetro de la URL
    const params = useParams();
    const category = propCategory || params.category;
    // Si no hay categoría, se muestra el menú completo (vista "Home")
    const showAll = !category;

    return (
        <div>
            <Header />

            {/* Título principal */}
            <Typography variant="h3" sx={{ my: 3, textAlign: 'center' }}>
                {showAll ? "Sushi Town Menu" : formatTitle(category)}
            </Typography>

            {/* Contenedor blanco */}
            <Container maxWidth="lg" sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
                {showAll ? (
                    // Vista completa: recorre todos los grupos de categorías
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {Object.entries(grupoCategorias).map(([grupo, tipos]) => (
                            <Box key={grupo}>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    {formatTitle(grupo)}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {tipos.map((tipo) => (
                                        <Accordion
                                            key={tipo}
                                            defaultExpanded
                                            disableGutters
                                            square
                                            sx={{
                                                boxShadow: 'none',
                                                borderBottom: '1px solid #333',
                                                '&:before': { display: 'none' }
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                sx={{
                                                    minHeight: 48,
                                                    pb: 0,
                                                    '& .MuiAccordionSummary-content': {
                                                        margin: 0,
                                                        whiteSpace: 'normal'
                                                    }
                                                }}
                                            >
                                                <Typography variant="h5">
                                                    {formatTitle(tipo)}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ px: 2, pt: 1, pb: 3 }}>
                                                <MenuList meals={data[tipo]} />
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    // Vista filtrada: solo se muestran las subcategorías del grupo seleccionado
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {grupoCategorias[category] ? (
                            grupoCategorias[category].map((tipo) => (
                                <Accordion
                                    key={tipo}
                                    defaultExpanded
                                    disableGutters
                                    square
                                    sx={{
                                        boxShadow: 'none',
                                        borderBottom: '1px solid #333',
                                        '&:before': { display: 'none' }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{
                                            minHeight: 48,
                                            pb: 0,
                                            '& .MuiAccordionSummary-content': {
                                                margin: 0,
                                                whiteSpace: 'normal'
                                            }
                                        }}
                                    >
                                        <Typography variant="h5">
                                            {formatTitle(tipo)}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ px: 2, pt: 1, pb: 3 }}>
                                        <MenuList meals={data[tipo]} />
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : (
                            <Typography variant="h6">Categoría no encontrada</Typography>
                        )}
                    </Box>
                )}
            </Container>
        </div>
    );
};

export default Menu;
