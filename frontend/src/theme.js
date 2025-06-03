// frontend/src/theme.js

/**
 * Devuelve el objeto de diseño según el modo (light/dark).
 */
export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Modo claro
                primary: {
                    main: '#1976d2'
                },
                background: {
                    default: '#f5f5f5',
                    paper: '#ffffff'
                },
                text: {
                    primary: '#000000',
                    secondary: '#555555'
                }
            }
            : {
                // Modo oscuro
                primary: {
                    main: '#90caf9'
                },
                background: {
                    default: '#121212',
                    paper: '#1e1e1e'
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#aaaaaa'
                }
            })
    }
});

// Export por defecto también, por compatibilidad con import default
export default getDesignTokens;
