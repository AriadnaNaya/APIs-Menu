import React, { useState, useEffect } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuList from './MenuList';
import useMobile from '../utils/useMobile';
import grupoCategorias from '../utils/grupoCategorias';
import formatTitle from '../utils/formatTitle';

const Menu = () => {
    const isMobile = useMobile();
    const [menuItems, setMenuItems] = useState([]);
    const [category, setCategory] = useState(Object.keys(grupoCategorias)[0]);
    const [subCategory, setSubCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/items')
            .then((res) => res.json())
            .then((data) => {
                setMenuItems(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching menu items:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Typography variant="h6" align="center">Cargando menú...</Typography>;
    }

    // Lista de subcategorías para la categoría seleccionada
    const catMap = grupoCategorias[category] || [];

    // Agrupar items por subcategoría
    const itemsBySub = catMap.reduce((acc, subCat) => {
        acc[subCat] = menuItems.filter(item => item.subCategory === subCat);
        return acc;
    }, {});

    return (
        <Container sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>
                {formatTitle(category)}
            </Typography>

            {catMap.map(subCat => (
                <Accordion
                    key={subCat}
                    expanded={subCategory === subCat}
                    onChange={() => setSubCategory(prev => (prev === subCat ? '' : subCat))}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{formatTitle(subCat)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MenuList items={itemsBySub[subCat] || []} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default Menu;
