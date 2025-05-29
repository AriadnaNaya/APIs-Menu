// APIs/frontend/src/components/MealDetailModal.jsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Chip
} from '@mui/material';
import {
    ArrowBackIos as BackIcon,
    ArrowForwardIos as NextIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import useMobile from '../utils/useMobile';
import formatTitle from '../utils/formatTitle';

export default function MealDetailModal({
                                            open,
                                            item = {},
                                            onClose,
                                            onPrev,
                                            onNext
                                        }) {
    const isMobile = useMobile();
    const {
        name = '',
        description = '',
        image = '',
        variants = []
    } = item;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {formatTitle(name)}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {image && (
                    <img
                        src={image}
                        alt={name}
                        style={{
                            width: '100%',
                            maxHeight: isMobile ? 200 : 400,
                            objectFit: 'cover',
                            borderRadius: 8,
                            marginBottom: 16
                        }}
                    />
                )}
                <Typography paragraph>{description}</Typography>
                {variants.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {variants.map((v, i) => (
                            <Chip
                                key={i}
                                label={`${formatTitle(v.name)} – $${v.price.toLocaleString()}`}
                                variant="outlined"
                            />
                        ))}
                    </div>
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between', px: 2 }}>
                <IconButton onClick={onPrev}>
                    <BackIcon />
                </IconButton>
                <IconButton onClick={onNext}>
                    <NextIcon />
                </IconButton>
            </DialogActions>
        </Dialog>
    );
}
