import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { data } from '../../data';
import Menulist from './Menulist';
import MenulistConVariantes from './MenulistConVariantes';


const mainCategories = ['🍣 Sushi & Rolls', '🍽️ Comida', '🍷 Bebidas', '📜 Todo el Menú'];

const categoryGroups = {
	'🍣 Sushi & Rolls': ['Rolls','hotRolls', 'maki', 'soyPaperRolls', 'geishas', 'nigiriSashimi', 'temakis', 'sushiCombinado', 'veggies'],
	'🍽️ Comida': ['entradas', 'townKitchen'],
	'🍷 Bebidas': ['cervezas', 'cocktails', 'sake', 'vinosBlancos', 'vinosTintos', 'vinosEspumantes', 'vinosPorCopas', 'bebidasSinAlcohol', 'mocktails'],
	'📜 Todo el Menú': [
		'entradas', 'Rolls', 'hotRolls', 'maki', 'soyPaperRolls',
		'geishas', 'nigiriSashimi', 'temakis', 'sushiCombinado', 'veggies',
		'postres', 'cervezas', 'cocktails', 'sake',
		'vinosBlancos', 'vinosTintos', 'vinosEspumantes',
		'vinosPorCopas', 'bebidasSinAlcohol', 'mocktails', 'townKitchen'
	] // Todas las categorías únicas
};

const Home = () => {
	const [selectedCategory, setSelectedCategory] = useState('🍣 Sushi & Rolls');

	return (
		<div>
			<h1 className='h1'>Menú Sushi Town</h1>

			<div className='main-category-container'>
				{mainCategories.map((category) => (
					<button
						key={category}
						className={`main-category ${selectedCategory === category ? 'active' : ''}`}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</button>
				))}
			</div>

			<div className='category-container'>
				{categoryGroups[selectedCategory].map((subCategory) => (
					<div key={subCategory} className='subcategory-section'>
						{['sushiCombinado', 'townKitchen'].includes(subCategory) ? (
							<MenulistConVariantes tipo={subCategory} />
						) : (
							<>
								<h3 className="subcategory-title">{subCategory}</h3>
								<Menulist
									meals={data
										.filter((meal) => meal.type === subCategory)
										}
								/>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
