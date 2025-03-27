import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Container
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import data from '../data/menuData';
import Header from '../components/Header';
import MenuList from '../components/MenuList';
import formatTitle from '../utils/formatTitle';
import grupoCategorias from '../utils/grupoCategorias';

const CategoryMenu = () => {
    const { category } = useParams();

    const tipos = grupoCategorias[category];
    if (!tipos) {
        return <Typography variant="h6">Categoría no encontrada</Typography>;
    }

    return (
        <div>
            <Header />

            {/* Título principal */}
            <Typography variant="h3" sx={{ my: 3, textAlign: 'center' }}>
                {formatTitle(category)}
            </Typography>

            {/* Contenedor blanco */}
            <Container maxWidth="lg" sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
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
            </Container>
        </div>
    );
};

export default CategoryMenu;
