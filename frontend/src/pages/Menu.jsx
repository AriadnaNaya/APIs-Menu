// frontend/src/pages/Menu.jsx
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Stack,
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

const MAIN_OPTIONS = [
    { label: 'Todas', value: 'all' },
    { label: '🍣 Sushi & Rolls', value: 'sushi-rolls' },
    { label: '🍽️ Comida',        value: 'comida' },
    { label: '🍷 Bebidas',        value: 'bebidas' },
    { label: '🍰 Postres',        value: 'postres' }
];

export default function Menu() {
    const isMobile = useMobile();

    // filtros
    const [selectedMain, setSelectedMain] = useState('all');
    const [selectedSub,  setSelectedSub]  = useState(null);

    // datos
    const [items,   setItems]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    // modal
    const [detailItem, setDetailItem] = useState(null);
    const [openModal,  setOpenModal]  = useState(false);
    const openDetail  = item => { setDetailItem(item); setOpenModal(true); };
    const closeDetail = ()   => setOpenModal(false);

    // fetch inicial
    useEffect(() => {
        fetch('/api/items')
            .then(res => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then(data => setItems(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Typography align="center" sx={{ mt: 4 }}>Cargando menú…</Typography>;
    if (error)   return <Typography color="error" align="center" sx={{ mt: 4 }}>{error}</Typography>;

    // calcular subcategorías aplicables
    const allSubs = Object.values(grupoCategorias).flat();
    const subCats = selectedMain === 'all'
        ? allSubs
        : grupoCategorias[selectedMain] || [];

    // si hay subfiltro
    const visibleSubs = selectedSub ? [selectedSub] : subCats;

    // agrupar items
    const itemsBySub = visibleSubs.reduce((acc, sub) => {
        acc[sub] = items.filter(i => i.category === sub);
        return acc;
    }, {});

    // para prev/next en modal
    const flatList = visibleSubs.flatMap(sub => itemsBySub[sub] || []);
    const handlePrev = () => {
        if (!detailItem) return;
        const idx = flatList.findIndex(i => i._id === detailItem._id);
        setDetailItem(flatList[(idx - 1 + flatList.length) % flatList.length]);
    };
    const handleNext = () => {
        if (!detailItem) return;
        const idx = flatList.findIndex(i => i._id === detailItem._id);
        setDetailItem(flatList[(idx + 1) % flatList.length]);
    };

    return (
        <>
            <HeroSlider />

            <Container maxWidth="lg" sx={{ my: 4, px: { xs: 0, sm: 2 } }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Explorar carta
                </Typography>

                {/* filtros principales */}
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mb: 2, flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    {MAIN_OPTIONS.map(opt => (
                        <Button
                            key={opt.value}
                            variant={selectedMain === opt.value ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => {
                                // toggle mismo botón
                                const nextMain = selectedMain === opt.value ? 'all' : opt.value;
                                setSelectedMain(nextMain);
                                setSelectedSub(null);
                            }}
                        >
                            {opt.label}
                        </Button>
                    ))}
                </Stack>

                {/* filtros secundarios */}
                {selectedMain !== 'all' && (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}
                    >
                        {subCats.map(sub => (
                            <Button
                                key={sub}
                                variant={selectedSub === sub ? 'contained' : 'outlined'}
                                color="secondary"
                                size={isMobile ? 'small' : 'medium'}
                                onClick={() => {
                                    setSelectedSub(selectedSub === sub ? null : sub);
                                }}
                            >
                                {formatTitle(sub)}
                            </Button>
                        ))}
                    </Stack>
                )}

                {/* acordeones por subcategoría */}
                {visibleSubs.map(sub => (
                    <Accordion key={sub} defaultExpanded sx={{ borderRadius: 2, boxShadow: 1, mb: 2, overflow: 'hidden' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{formatTitle(sub)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MenuList items={itemsBySub[sub] || []} onItemClick={openDetail} />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Container>

            {/* detalle modal */}
            {detailItem && (
                <MealDetailModal
                    open={openModal}
                    item={detailItem}
                    onClose={closeDetail}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </>
    );
}
