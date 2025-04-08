import React, { useState } from 'react';
import { Box } from '@mui/material';
import MenuItemCard from './MenuItemCard';
import MealDetailModal from './MealDetailModal';

const MenuList = ({ meals,onMealClick }) => {
	const [selectedMealIndex, setSelectedMealIndex] = useState(null);

	return (
		<>
			<Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
				{meals.map((meal, index) => (
					<div key={index} onClick={() => onMealClick(meal)}>
						<MenuItemCard
							meal={meal}
							isExpanded={false}
							onToggle={() => onMealClick(meal)}
						/>
					</div>
				))}
			</Box>
		</>
	);
};

export default MenuList;
