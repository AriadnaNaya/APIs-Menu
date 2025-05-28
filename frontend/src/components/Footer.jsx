import React from 'react';
import { Box, Typography, Grid, Link, Fade } from '@mui/material';
import { Instagram, Facebook } from '@mui/icons-material';

const Footer = () => {
    return (
        <Fade in timeout={800}>
            <Box
                sx={{
                    backgroundColor: '#111827',
                    color: '#e0e0e0',
                    padding: '2rem 1rem',
                    borderTop: '1px solid rgba(0, 200, 134, 0.2)'
                }}
            >
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Contacto */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ color: '#00c886' }}>Contacto</Typography>
                        <Typography variant="body2">📍 Dirección: Paraná 3097
                            Martínez, Buenos Aires</Typography>
                        <Typography variant="body2">📞 Teléfono: +54 9 11 6228-8696</Typography>
                        <Typography variant="body2">🕐 Horarios: Lun a Dom - 12:00 a 16:00hs | 19:00 a 00:00hs</Typography>
                    </Grid>

                    {/* Redes */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ color: '#00c886' }}>Redes Sociales</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Link href="https://www.instagram.com/sushitownar/" target="_blank" color="#e0e0e0" underline="hover">
                                <Instagram />
                            </Link>
                            <Link href="https://www.facebook.com/sushitown.town" target="_blank" color="#e0e0e0" underline="hover">
                                <Facebook />
                            </Link>
                        </Box>
                    </Grid>

                    {/* Mapa */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ color: '#00c886' }}>Ubicación</Typography>
                        <Box sx={{ mt: 1 }}>
                            <iframe
                                title="Ubicación Sushi Town"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.902291051018!2d-58.5145767!3d-34.5053613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb0fb57826553%3A0xd1f7cc119ab0797e!2sSushi%20Town!5e0!3m2!1ses-419!2sar!4v1745417166406!5m2!1ses-419!2sar"
                                width="100%"
                                height="200"
                                style={{border: 0, borderRadius: '12px', boxShadow: '0 0 8px rgba(0,0,0,0.1)'}}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                        </Box>
                    </Grid>
                </Grid>

                <Box textAlign="center" mt={4} pt={2} borderTop="1px solid rgba(255,255,255,0.1)">
                    <Typography variant="body2" sx={{color: '#888'}}>
                        © {new Date().getFullYear()} SUSHI TOWN, ALL RIGHTS RESERVED.
                    </Typography>
                </Box>
            </Box>
        </Fade>
    );
};

export default Footer;
