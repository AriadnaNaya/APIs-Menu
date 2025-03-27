import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00c886', // Color principal (usado en bordes, textos destacados, etc.)
            contrastText: '#fff'
        },
        secondary: {
            main: '#007bff'
        },
        background: {
            default: '#f0f6fc' // Color de fondo del body
        }
    },
    typography: {
        fontFamily: "'Nunito', sans-serif",
        h1: {
            fontFamily: "'Bonheur Royale', cursive",
            fontWeight: 700,
            fontSize: '3rem'
        },
        h3: {
            fontFamily: "'Bonheur Royale', cursive",
            fontWeight: 700,
            fontSize: '2rem'
        },
        h4: {
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    color: '#333'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none' // Evita que se conviertan en mayúsculas por defecto
                }
            }
        }
    }
});

export default theme;
