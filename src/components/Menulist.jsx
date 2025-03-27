import React, { useState } from 'react';
import { Box } from '@mui/material';
import MenuItemCard from './MenuItemCard';

const MenuList = ({ meals }) => {
	const [expandedIndex, setExpandedIndex] = useState(null);

	const toggleExpand = (index) => {
		setExpandedIndex(prev => (prev === index ? null : index));
	};

	return (
		<Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
			{meals.map((meal, index) => (
				<MenuItemCard
					key={index}
					meal={meal}
					isExpanded={expandedIndex === index}
					onToggle={() => toggleExpand(index)}
				/>
			))}
		</Box>
	);
};

export default MenuList;
