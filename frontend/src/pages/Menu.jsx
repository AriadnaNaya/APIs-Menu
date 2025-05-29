import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import HeroSlider      from '../components/HeroSlider';
import MenuList        from '../components/MenuList';
import MealDetailModal from '../components/MealDetailModal';
import useMobile       from '../utils/useMobile';
import formatTitle     from '../utils/formatTitle';
import grupoCategorias from '../utils/grupoCategorias';

export default function Menu() {
    const isMobile = useMobile();
    const { search } = useLocation();

    // Derivar categoría principal de la URL
    const mainCats = Object.keys(grupoCategorias);
    const params   = new URLSearchParams(search);
    const category = params.get('category') || mainCats[0];

    // Datos planos del backend
    const [items, setItems]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    // Modal
    const [selected, setSelected] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const openDetail  = item => { setSelected(item); setOpenModal(true); };
    const closeDetail = ()   => setOpenModal(false);

    // Prev/Next en modal
    const subCats = grupoCategorias[category] || [];
    const itemsBySub = subCats.reduce((acc, sub) => {
        acc[sub] = items.filter(i => i.category === sub);
        return acc;
    }, {});
    const flat = subCats.flatMap(sub => itemsBySub[sub] || []);

    const handlePrev = () => {
        if (!selected) return;
        const idx  = flat.findIndex(i => i._id === selected._id);
        setSelected(flat[(idx - 1 + flat.length) % flat.length]);
    };
    const handleNext = () => {
        if (!selected) return;
        const idx  = flat.findIndex(i => i._id === selected._id);
        setSelected(flat[(idx + 1) % flat.length]);
    };

    // Fetch
    useEffect(() => {
        fetch('/api/items')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => setItems(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Typography align="center">Cargando menú…</Typography>;
    if (error)   return <Typography color="error" align="center">{error}</Typography>;

    return (
        <>
            <HeroSlider />

            <Container sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {formatTitle(category)}
                </Typography>

                {subCats.map(sub => (
                    <Accordion key={sub} defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {/* Título con mayor tamaño */}
                            <Typography variant="h5">{formatTitle(sub)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MenuList
                                items={itemsBySub[sub] || []}
                                onItemClick={openDetail}
                            />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Container>

            {selected && (
                <MealDetailModal
                    open={openModal}
                    item={selected}
                    onClose={closeDetail}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </>
    );
}
