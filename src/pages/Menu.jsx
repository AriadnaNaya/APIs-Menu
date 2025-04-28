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
import menuData from '../data/menuData';
import formatTitle from '../utils/formatTitle';
import grupoCategorias from '../utils/grupoCategorias';
import { useState } from 'react';
import MealDetailModal from '../components/MealDetailModal';
import Footer from '../components/Footer';
import HeroSlider from "../components/HeroSlider";
const data= menuData;

const Menu = ({ category: propCategory }) => {
    // Usa la prop "category" si se pasa, o bien el parámetro de la URL
    const params = useParams();
    const category = propCategory || params.category;
    // Si no hay categoría, se muestra el menú completo (vista "Home")
    const showAll = !category;
    const allMeals = Object.values(menuData).flat();


    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleOpen = (meal) => {
        const index = allMeals.findIndex((m) => m.nombre === meal.nombre);
        setSelectedIndex(index);
    };

    const handleClose = () => setSelectedIndex(null);

    const handlePrev = () => {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allMeals.length - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev < allMeals.length - 1 ? prev + 1 : 0));
    };

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
                {showAll ? "Menu" : formatTitle(category)}
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
                                                <MenuList meals={data[tipo]} onMealClick={handleOpen} />
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
                                        <MenuList meals={data[tipo]} onMealClick={handleOpen} />
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : (
                            <Typography variant="h6">Categoría no encontrada</Typography>
                        )}
                    </Box>
                )}
            </Container>
            {selectedIndex !== null && allMeals[selectedIndex] && (
                <MealDetailModal
                    open={true}
                    onClose={handleClose}
                    meal={allMeals[selectedIndex]}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
            <Footer/>
        </div>
    );
};

export default Menu;
