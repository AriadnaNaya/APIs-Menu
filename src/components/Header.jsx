import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header className='header'>
			<nav className='nav'>
				<ul className='nav-list'>
					<li className='nav-item'>
						<NavLink to='/' className='nav-link'>Inicio</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='/menu/sushi-rolls' className='nav-link'>🍣 Sushi & Rolls</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='/menu/comida' className='nav-link'>🍽️ Comida</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='/menu/bebidas' className='nav-link'>🍷 Bebidas</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;