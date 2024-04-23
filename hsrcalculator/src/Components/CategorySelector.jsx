import React, { useState, useEffect } from 'react';
import Non_DairyBeverages from '../Calculators/Non_DairyBeverages';

const CategorySelector = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isNonDairySelected, setIsNonDairySelected] = useState(false);

    useEffect(() => {
        fetch('/categories')
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
        <div>
            Category: <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            {isNonDairySelected && <Non_DairyBeverages />}
            {/* Render other components based on selectedCategory if needed */}
        </div>
    );
};

export default CategorySelector;





