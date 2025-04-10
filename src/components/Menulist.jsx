import React, { useState } from 'react';
import { Box } from '@mui/material';
import MenuItemCard from './MenuItemCard';

const MenuList = ({ meals, onMealClick }) => {
	const [expandedIndex, setExpandedIndex] = useState(null);

	const handleToggle = (index, meal) => {
		setExpandedIndex((prev) => (prev === index ? null : index));
		if (onMealClick) {
			onMealClick(meal);
		}
	};

	return (
		<Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
			{meals.map((meal, index) => (
				<Box key={index} onClick={() => handleToggle(index, meal)}>
					<MenuItemCard
						meal={meal}
						isExpanded={expandedIndex === index}
						onToggle={() => handleToggle(index, meal)}
					/>
				</Box>
			))}
		</Box>
	);
};

export default MenuList;
