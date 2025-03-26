import React from 'react';

const Menulist = ({ meals }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 meal-container">
			{meals.map((meal) => (
				<div key={meal.id} className="meal-card">
					<img
						src={meal.img || "https://via.placeholder.com/80"}
						alt={meal.title}
						className="meal-image"
					/>
					<div className="meal-info">
						<div className="meal-header">
							<h5 className="meal-title">{meal.title}</h5>
							<small className="meal-price">{meal.price}</small>
						</div>
						{meal.para && meal.para.toLowerCase() !== 'sin descripción' && (
							<p className="meal-description">{meal.para}</p>
						)}
					</div>
				</div>

			))}
		</div>
	);
};

export default Menulist;
