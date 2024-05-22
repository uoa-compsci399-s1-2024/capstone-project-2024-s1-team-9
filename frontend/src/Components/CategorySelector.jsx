import React, { useState, useEffect } from 'react';
import Non_DairyBeverages from '../Calculators/Non_DairyBeverages';
import "./CategoryStyles.css";
import FoodRatingForm from '../Calculators/FoodRatingForm';

const BACKEND_URL = 'https://backend-service-5ufi.onrender.com';

const CategorySelector = ({ setGlobalScore, setRatingPreview, setDownloadData }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isNonDairySelected, setIsNonDairySelected] = useState(false);

    useEffect(() => {
        fetch(`${BACKEND_URL}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setIsNonDairySelected(event.target.value === "Non-dairy beverages");
    };

    return (
        <div className='category-selector-container'>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <div className="content-wrapper">
                {selectedCategory && !isNonDairySelected && 
                    <FoodRatingForm selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setGlobalScore={setGlobalScore} setRatingPreview={setRatingPreview} setDownloadData={setDownloadData} />
                }
                {isNonDairySelected && 
                    <Non_DairyBeverages selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setGlobalScore={setGlobalScore} setRatingPreview={setRatingPreview} setDownloadData={setDownloadData} />
                }
            </div>
        </div>
    );
};

export default CategorySelector;
