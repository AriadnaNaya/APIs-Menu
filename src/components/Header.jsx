import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Box,
	Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMobile from '../hooks/useMobile';

const Header = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const isMobile = useMobile();

	const menuItems = [
		{ text: 'Inicio', to: '/' },
		{ text: '🍣 Sushi & Rolls', to: '/menu/sushi-rolls' },
		{ text: '🍽️ Comida', to: '/menu/comida' },
		{ text: '🍷 Bebidas', to: '/menu/bebidas' },
		{ text: '🍰 Postres', to: '/menu/postres' }
	];

	const handleDrawerOpen = () => {
		setOpenDrawer(true);
	};

	const handleDrawerClose = () => {
		setOpenDrawer(false);
	};

	return (
		<AppBar position="static" elevation={1} sx={{ backgroundColor: '#111827' }}>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
					px: 3,
				}}
			>
				{/* IZQUIERDA - LOGO o MENÚ HAMBURGUESA */}
				<Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
					{isMobile ? (
						<>
							<IconButton color="inherit" edge="start" onClick={handleDrawerOpen}>
								<MenuIcon />
							</IconButton>
							<Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
								<List sx={{ width: 200 }}>
									{menuItems.map((item) => (
										<ListItem
											button
											component={NavLink}
											to={item.to}
											key={item.text}
											onClick={handleDrawerClose}
										>
											<ListItemText primary={item.text} />
										</ListItem>
									))}
								</List>
							</Drawer>
						</>
					) : (
						<img
							src="/img/logo.jpg"
							alt="Sushi Town"
							style={{
								height: 40,
								backgroundColor: 'white',
								padding: '6px',
								borderRadius: '6px',
							}}
						/>
					)}
				</Box>

				{/* CENTRO - MENÚ */}
				{!isMobile && (
					<Box sx={{ flex: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
						{menuItems.map((item) => (
							<Button
								key={item.text}
								component={NavLink}
								to={item.to}
								color="inherit"
								sx={{
									color: '#f5f5f5',
									fontSize: '0.9rem',
									'&:hover': { color: '#00c886' },
								}}
							>
								{item.text}
							</Button>
						))}
					</Box>
				)}

				{/* DERECHA - DIRECCIÓN */}
				{!isMobile && (
					<Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
						<Typography variant="body2" sx={{ color: '#f5f5f5', whiteSpace: 'nowrap' }}>
							📍 Paraná 3097, Martínez, Bs. As.
						</Typography>
					</Box>
				)}
			</Toolbar>

		</AppBar>
	);
};

export default Header;
