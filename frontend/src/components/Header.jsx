import React, { useState, useContext } from 'react';
import {
	AppBar, Toolbar, IconButton, Typography,
	Button, Drawer, List, ListItemButton,
	ListItemText, Box, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const menuItems = [
	{ text: 'Inicio', to: '/' },
	{ text: '🍣 Sushi & Rolls', to: '/menu?category=sushi-rolls' },
	{ text: '🍽️ Comida', to: '/menu?category=comida' },
	{ text: '🍷 Bebidas', to: '/menu?category=bebidas' },
	{ text: '🍰 Postres', to: '/menu?category=postres' }
];

export default function Header() {
	const [open, setOpen] = useState(false);
	const { pathname, search } = useLocation();
	const navigate = useNavigate();
	const { token, client, logout } = useContext(AuthContext);
	const current = pathname + search;

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton
						edge="start" color="inherit"
						onClick={() => setOpen(true)} sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Town Kitchen
					</Typography>

					<Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
						{menuItems.map(item => (
							<Button
								key={item.to}
								color="inherit"
								component={Link}
								to={item.to}
								sx={{ textDecoration: current === item.to ? 'underline' : 'none' }}
							>
								{item.text}
							</Button>
						))}

						{token ? (
							<>
								<Avatar
									src={client.avatar}
									alt={client.name}
									sx={{ width: 32, height: 32, ml: 2, mr: 1 }}
								/>
								<Button color="inherit" disabled>
									{client.name}
								</Button>
								<Button color="inherit" onClick={handleLogout}>
									Logout
								</Button>
							</>
						) : (
							<>
								<Button color="inherit" component={Link} to="/login">
									Login
								</Button>
								<Button color="inherit" component={Link} to="/register">
									Register
								</Button>
							</>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			<Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
				<Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
					<List>
						{menuItems.map(item => (
							<ListItemButton
								key={item.to}
								component={Link}
								to={item.to}
								selected={current === item.to}
							>
								<ListItemText primary={item.text} />
							</ListItemButton>
						))}

						{token ? (
							<>
								<ListItemButton disabled>
									<Avatar src={client.avatar} sx={{ mr: 1 }} />
									<ListItemText primary={client.name} />
								</ListItemButton>
								<ListItemButton onClick={handleLogout}>
									<ListItemText primary="Logout" />
								</ListItemButton>
							</>
						) : (
							<>
								<ListItemButton component={Link} to="/login">
									<ListItemText primary="Login" />
								</ListItemButton>
								<ListItemButton component={Link} to="/register">
									<ListItemText primary="Register" />
								</ListItemButton>
							</>
						)}
					</List>
				</Box>
			</Drawer>
		</>
	);
}
