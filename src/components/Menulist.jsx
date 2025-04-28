import React from 'react';
import { Box } from '@mui/material';
import MenuItemCard from './MenuItemCard';

const MenuList = ({ meals, onMealClick }) => {
	return (
		<Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
			{meals.map((meal, index) => (
				<Box key={index} onClick={() => onMealClick(meal)}>
					<MenuItemCard
						meal={meal}
						isExpanded={false}
						onToggle={() => onMealClick(meal)}
					/>
				</Box>
			))}
		</Box>
	);
};

export default MenuList;
