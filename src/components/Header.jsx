// src/components/Header.jsx
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
	ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMobile from '../hooks/useMobile';

const Header = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const isMobile = useMobile();

	const menuItems = [
		{ text: 'Inicio', to: '/menu' },
		{ text: '🍣 Sushi & Rolls', to: '/menu?category=sushi-rolls' },
		{ text: '🍽️ Comida', to: '/menu?category=comida' },
		{ text: '🍷 Bebidas', to: '/menu?category=bebidas' },
		{ text: '🍰 Postres', to: '/menu?category=postres' }
	];

	const handleDrawerOpen = () => setOpenDrawer(true);
	const handleDrawerClose = () => setOpenDrawer(false);

	return (
		<AppBar position="static" color="default" elevation={1}>
			<Toolbar sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
				{isMobile ? (
					<>
						<IconButton color="inherit" edge="start" onClick={handleDrawerOpen} sx={{ mr: 2 }}>
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
					<>
						{menuItems.map((item) => (
							<Button
								key={item.text}
								component={NavLink}
								to={item.to}
								color="inherit"
								sx={{ mr: 2 }}
							>
								{item.text}
							</Button>
						))}
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
