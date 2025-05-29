// APIs/frontend/src/components/MenuList.jsx
import React from 'react';
import MenuItemCard from './MenuItemCard';

export default function MenuList({ items = [], onItemClick }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map(item => (
                <MenuItemCard
                    key={item._id}
                    item={item}
                    onClick={() => onItemClick(item)}
                />
            ))}
        </div>
    );
}
