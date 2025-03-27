import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Menulist from './Menulist';
import { data } from '../../data';

const CategoryMenu = () => {
    const { category } = useParams();
    const filteredMeals = category === 'all'
        ? data
        : data.filter((meal) => meal.tipo?.toLowerCase() === category.toLowerCase());

    return (
        <div>
            <Header title={`${category.charAt(0).toUpperCase() + category.slice(1)} Menu💖`} />
            <Menulist meals={filteredMeals} />
        </div>
    );
};

export default CategoryMenu;