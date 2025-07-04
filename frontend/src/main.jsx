// frontend/src/main.jsx
import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from './theme';

import { AuthProvider } from './context/AuthContext';
import { ColorModeContext } from './context/ColorModeContext';

// slick-carousel CSS para sliders
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Main() {
    const [mode, setMode] = useState('dark');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode(prev => (prev === 'light' ? 'dark' : 'light'))
        }),
        []
    );

    const theme = useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
