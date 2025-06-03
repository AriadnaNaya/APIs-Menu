// frontend/src/components/Header.jsx
import React, { useState, useContext } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Box,
	Button,
	Avatar,
	Menu,
	MenuItem,
	Drawer,
	List,
	ListItemButton,
	ListItemText
} from '@mui/material';
import MenuIcon      from '@mui/icons-material/Menu';
import DarkModeIcon  from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext }      from '../context/AuthContext';
import { ColorModeContext } from '../context/ColorModeContext';
import { useTheme }         from '@mui/material/styles';

export default function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [anchorEl,   setAnchorEl]   = useState(null);
	const openMenu = Boolean(anchorEl);

	const navigate  = useNavigate();
	const { token, client, logout } = useContext(AuthContext);
	const colorMode = useContext(ColorModeContext);
	const theme     = useTheme();

	const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
	const handleAvatarClick  = e => setAnchorEl(e.currentTarget);
	const handleMenuClose    = () => setAnchorEl(null);

	const handleProfile        = () => { navigate('/profile');       handleMenuClose(); };
	const handleMyReservations = () => { navigate('/mis-reservas');  handleMenuClose(); };
	const handleMyReviews      = () => { navigate('/mis-resenas');   handleMenuClose(); };
	const handleLogout         = () => { logout(); navigate('/');     handleMenuClose(); };

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>Sushi Town</Typography>
			<List>
				<ListItemButton component={Link} to="/menu">
					<ListItemText primary="Explorar carta" />
				</ListItemButton>
				{client?.role === 'admin' && (
					<ListItemButton component={Link} to="/admin">
						<ListItemText primary="Panel de Control" />
					</ListItemButton>
				)}

				{token ? (
					<>
						<ListItemButton onClick={handleProfile}>
							<ListItemText primary="Mi Perfil" />
						</ListItemButton>
						<ListItemButton onClick={handleMyReservations}>
							<ListItemText primary="Mis Reservas" />
						</ListItemButton>
						<ListItemButton onClick={handleMyReviews}>
							<ListItemText primary="Mis Reseñas" />
						</ListItemButton>
						<ListItemButton onClick={handleLogout}>
							<ListItemText primary="Cerrar Sesión" />
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

				{/* Toggle modo en drawer */}
				<ListItemButton onClick={colorMode.toggleColorMode}>
					<ListItemText
						primary={
							theme.palette.mode === 'dark' ? 'Cambiar a Claro' : 'Cambiar a Oscuro'
						}
					/>
				</ListItemButton>
			</List>
		</Box>
	);

	return (
		<>
			<AppBar component="nav" color="inherit" elevation={1}>
				<Toolbar>
					{/* Icono hamburguesa en móvil */}
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>

					{/* Logo */}
					<Typography
						component={Link}
						to="/"
						variant="h6"
						sx={{
							flexGrow: 1,
							textDecoration: 'none',
							color: 'inherit',
							fontWeight: 'bold'
						}}
					>
						Sushi Town
					</Typography>

					{/* Navegación en escritorio */}
					<Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
						{client?.role === 'admin' && (
							<Button
								component={Link}
								to="/admin"
								color="inherit"
								sx={{ textTransform: 'none', mr: 2 }}
							>
								Panel de Control
							</Button>
						)}
						<Button
							component={Link}
							to="/menu"
							color="inherit"
							sx={{ textTransform: 'none', mr: 2 }}
						>
							Explorar carta
						</Button>

						{/* Botón toggle modo */}
						<IconButton
							color="inherit"
							onClick={colorMode.toggleColorMode}
							sx={{ mr: 2 }}
						>
							{theme.palette.mode === 'dark'
								? <LightModeIcon />
								: <DarkModeIcon />
							}
						</IconButton>

						{token ? (
							<>
								<IconButton onClick={handleAvatarClick} sx={{ p: 0, mr: 1 }}>
									<Avatar src={client.avatar} alt={client.name} />
								</IconButton>
								<Menu
									anchorEl={anchorEl}
									open={openMenu}
									onClose={handleMenuClose}
								>
									<MenuItem onClick={handleProfile}>Mi Perfil</MenuItem>
									<MenuItem onClick={handleMyReservations}>Mis Reservas</MenuItem>
									<MenuItem onClick={handleMyReviews}>Mis Reseñas</MenuItem>
									<MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
								</Menu>
							</>
						) : (
							<>
								<Button
									component={Link}
									to="/login"
									color="inherit"
									sx={{ textTransform: 'none', mr: 1 }}
								>
									Login
								</Button>
								<Button
									component={Link}
									to="/register"
									variant="contained"
									color="primary"
									sx={{ textTransform: 'none' }}
								>
									Register
								</Button>
							</>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			{/* Drawer móvil */}
			<Drawer
				anchor="left"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
				}}
			>
				{drawer}
			</Drawer>
		</>
	);
}
