import React, { useState } from 'react';
import { data } from '../../data';
import Menulist from './Menulist';

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
	]
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
						<h3 className="subcategory-title">{subCategory}</h3>
						<Menulist meals={data.filter((meal) => meal.tipo === subCategory)} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;