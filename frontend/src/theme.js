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
                    main: '#0d47a1', // azul profundo
                    contrastText: '#fff'
                },
                secondary: {
                    main: '#ff7043', // naranja coral
                    contrastText: '#fff'
                },
                background: {
                    default: '#f6f8fa',
                    paper: '#fff'
                },
                text: {
                    primary: '#222',
                    secondary: '#5a5a5a'
                },
                divider: '#e0e0e0',
                success: { main: '#43a047' },
                error: { main: '#e53935' },
                warning: { main: '#ffa726' },
                info: { main: '#1976d2' }
            }
            : {
                // Modo oscuro
                primary: {
                    main: '#90caf9',
                    contrastText: '#222'
                },
                secondary: {
                    main: '#ffb74d',
                    contrastText: '#222'
                },
                background: {
                    default: '#181c24',
                    paper: '#232936'
                },
                text: {
                    primary: '#f5f5f5',
                    secondary: '#b0b0b0'
                },
                divider: '#333a47',
                success: { main: '#66bb6a' },
                error: { main: '#ef5350' },
                warning: { main: '#ffa726' },
                info: { main: '#90caf9' }
            })
    },
    typography: {
        fontFamily: 'Inter, Nunito, Roboto, Arial, sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 }
    },
    shape: {
        borderRadius: 14
    },
    shadows: Array(25).fill('none').map((_, i) => i === 1 ? '0 2px 8px 0 rgba(0,0,0,0.08)' : 'none'),
});

// Export por defecto también, por compatibilidad con import default
export default getDesignTokens;
