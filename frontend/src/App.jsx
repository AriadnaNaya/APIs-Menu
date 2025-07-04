// frontend/src/App.jsx
import React, { useState, useMemo, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, Toolbar, CssBaseline, ThemeProvider, Container } from '@mui/material';
import { createTheme, useTheme } from '@mui/material/styles';

import getDesignTokens from './theme';

import Header         from './components/Header';
import Footer         from './components/Footer';
import BackToTop      from './components/BackToTop';

import AdminPanel 	  from './pages/AdminPanel';
import Home           from './pages/Home';
import Menu           from './pages/Menu';
import About          from './pages/About';
import Login          from './pages/Login';
import Register       from './pages/Register';
import ReviewForm     from './pages/ReviewForm';
import Profile        from './pages/Profile';
import MyReviews      from './pages/MyReviews';
import { ColorModeContext } from './context/ColorModeContext';
import { AuthContext } from './context/AuthContext';
import AdminPlatos from './pages/AdminPlatos';
import AdminUsuarios from './pages/AdminUsuarios';

// Context para exponer el toggle a todos los componentes
export default function App() {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	const { client } = useContext(AuthContext) || {};
	const location = useLocation();

	// Si es admin y no está en /admin o rutas de admin, redirige a /admin
	/*
	if (client?.role === 'admin' && !location.pathname.startsWith('/admin')) {
		return <Navigate to="/admin" replace />;
	}
	*/

	// Si NO es admin y quiere acceder a rutas de admin, redirige a home
	if (client?.role !== 'admin' && location.pathname.startsWith('/admin')) {
		return <Navigate to="/" replace />;
	}

	// Páginas que no necesitan contenedor con ancho máximo (hero sections que van full width)
	const fullWidthPages = ['/', '/menu'];
	const isFullWidthPage = fullWidthPages.includes(location.pathname);

	// Páginas de admin que necesitan su propio manejo de padding
	const adminPages = ['/admin', '/admin/platos', '/admin/usuarios'];
	const isAdminPage = adminPages.includes(location.pathname);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Header />
			
			{/* Conditional spacing - no toolbar space for pages with hero sections */}
			{!['/', '/menu'].includes(location.pathname) && <Toolbar />}

			<Box component="main" sx={{ 
				flexGrow: 1,
				width: '100%',
				maxWidth: isFullWidthPage ? '100%' : '1200px', // Limitar ancho máximo
				margin: '0 auto', // Centrar el contenido
				px: isAdminPage 
					? 0  // No padding for admin pages (they handle their own)
					: isFullWidthPage 
						? 0  // No padding for full width pages
						: { xs: 2, sm: 3, md: 4 }  // Normal padding for other pages
			}}>
				<Routes>
					<Route path="/"             element={<Home />} />
					<Route path="/menu"         element={<Menu />} />
					<Route path="/about"        element={<About />} />
					<Route path="/login"        element={<Login />} />
					<Route path="/register"     element={<Register />} />
					<Route path="/review"       element={<ReviewForm />} />
					<Route path="/profile"      element={<Profile />} />
					<Route path="/mis-resenas"  element={<MyReviews />} />
					<Route path="/admin"        element={<AdminPanel />} />
					<Route path="/admin/platos"   element={<AdminPlatos />} />
					<Route path="/admin/usuarios" element={<AdminUsuarios />} />
				</Routes>
			</Box>

			<Footer />
			<BackToTop />
		</Box>
	);
}
