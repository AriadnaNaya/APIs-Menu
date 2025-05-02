// src/pages/Menu.jsx
import { useSearchParams } from 'react-router-dom';
import {
    Typography,
    Container,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import MenuList from '../components/MenuList';
import MealDetailModal from '../components/MealDetailModal';
import Footer from '../components/Footer';

import menuData from '../data/menuData';
import grupoCategorias from '../utils/grupoCategorias';
import formatTitle from '../utils/formatTitle';

const Menu = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category'); // ejemplo: 'sushi-rolls', 'comida', etc.

    // Aplanamos todos los platos para navegación del modal
    const allMeals = Object.values(menuData).flat();

    // Modal state
    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleOpen = (meal) => {
        const idx = allMeals.findIndex((m) => m.nombre === meal.nombre);
        setSelectedIndex(idx);
    };
    const handleClose = () => setSelectedIndex(null);
    const handlePrev = () =>
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allMeals.length - 1));
    const handleNext = () =>
        setSelectedIndex((prev) => (prev < allMeals.length - 1 ? prev + 1 : 0));

    // Determinar modo de renderizado
    const showAll = !categoryParam;
    const isGroup = categoryParam && grupoCategorias[categoryParam];
    const isTipo = categoryParam && menuData[categoryParam];

    return (
        <div>
            <Header />
            <HeroSlider />

            <Typography
                variant="h3"
                sx={{
                    my: 3,
                    textAlign: 'center',
                    color: '#f9fafb',
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 'bold',
                    textShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}
            >
                {showAll ? 'Menu' : formatTitle(categoryParam)}
            </Typography>

            <Container maxWidth="lg" sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
                {/* VISTA COMPLETA */}
                {showAll && (
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
                                                <Typography variant="h5">{formatTitle(tipo)}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ px: 2, pt: 1, pb: 3 }}>
                                                <MenuList meals={menuData[tipo]} onMealClick={handleOpen} />
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}

                {/* VISTA FILTRADA POR GRUPO */}
                {isGroup && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            {formatTitle(categoryParam)}
                        </Typography>
                        {grupoCategorias[categoryParam].map((tipo) => (
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
                                    <Typography variant="h5">{formatTitle(tipo)}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ px: 2, pt: 1, pb: 3 }}>
                                    <MenuList meals={menuData[tipo]} onMealClick={handleOpen} />
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                )}

                {/* VISTA FILTRADA POR TIPO DIRECTO */}
                {isTipo && !isGroup && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            {formatTitle(categoryParam)}
                        </Typography>
                        <MenuList meals={menuData[categoryParam]} onMealClick={handleOpen} />
                    </Box>
                )}

                {/* CATEGORÍA NO ENCONTRADA */}
                {!showAll && !isGroup && !isTipo && (
                    <Typography variant="h6">Categoría no encontrada</Typography>
                )}
            </Container>

            {selectedIndex !== null && (
                <MealDetailModal
                    open
                    onClose={handleClose}
                    meal={allMeals[selectedIndex]}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}

            <Footer />
        </div>
    );
};

export default Menu;
