import React, { useState, useEffect } from 'react';
import Non_DairyBeverages from '../Calculators/Non_DairyBeverages';

const BACKEND_URL = 'https://backend-service-5ufi.onrender.com';

import "./CategoryStyles.css";
import FoodRatingForm from '../Calculators/FoodRatingForm';
const CategorySelector = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isNonDairySelected, setIsNonDairySelected] = useState(false);
    

    useEffect(() => {
        fetch('${BACKEND_URL}')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        // Check if the selected category is "1 - Non-dairy beverages"
        setIsNonDairySelected(event.target.value === "1 - Non-dairy beverages");
    };

    return (
        <div className='main-container'>
            Category: <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            {selectedCategory && !isNonDairySelected && <FoodRatingForm selectedCategory={selectedCategory}/>}
            
            {isNonDairySelected && <Non_DairyBeverages />}
        </div>
    );
};

export default CategorySelector;





