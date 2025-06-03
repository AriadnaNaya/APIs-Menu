// frontend/src/App.jsx
import React, { useState, useMemo, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Toolbar, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import getDesignTokens from './theme';

import Header         from './components/Header';
import Footer         from './components/Footer';
import BackToTop      from './components/BackToTop';

import AdminPanel 	  from './pages/AdminPanel';
import Home           from './pages/Home';
import Menu           from './pages/Menu';
import About          from './pages/About';
import Reserva        from './pages/Reserva';
import Login          from './pages/Login';
import Register       from './pages/Register';
import ReviewForm     from './pages/ReviewForm';
import Profile        from './pages/Profile';
import MyReservations from './pages/MyReservations';
import MyReviews      from './pages/MyReviews';

// Context para exponer el toggle a todos los componentes
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App() {
	// Por defecto en modo oscuro
	const [mode, setMode] = useState('dark');

	// Memoriza la función toggle
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
			}
		}),
		[]
	);

	// Genera el tema cada vez que cambia el mode
	const theme = useMemo(
		() => createTheme(getDesignTokens(mode)),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				{/* Normaliza estilos base */}
				<CssBaseline />

				<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
					<Header />
					{/* Este Toolbar hace espacio igual al AppBar para que no tape el contenido */}
					<Toolbar />

					<Box component="main" sx={{ flexGrow: 1, px: { xs: 2, sm: 3, md: 4 } }}>
						<Routes>
							<Route path="/"             element={<Home />} />
							<Route path="/menu"         element={<Menu />} />
							<Route path="/about"        element={<About />} />
							<Route path="/reserva"      element={<Reserva />} />
							<Route path="/login"        element={<Login />} />
							<Route path="/register"     element={<Register />} />
							<Route path="/review"       element={<ReviewForm />} />
							<Route path="/profile"      element={<Profile />} />
							<Route path="/mis-reservas" element={<MyReservations />} />
							<Route path="/mis-resenas"  element={<MyReviews />} />
							<Route path="/admin"        element={<AdminPanel />} />

						</Routes>
					</Box>

					<Footer />
					<BackToTop />
				</Box>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
