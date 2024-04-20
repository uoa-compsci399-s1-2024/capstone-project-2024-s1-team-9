import React, { useState } from 'react';
import './category.css'; // Import CSS file for styling

const CategorySelector = () => {
  // State to hold the selected category
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to handle change in category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // List of categories
  const categories = ['1. Non- dairy beverage', '1D. Milk and Dairy beverages', '2. Food', '2D. Dairy foods', '3. Oils and Spreads', '3D. Cheese'];

  return (
    <div>
      <label htmlFor="category">Select a Category:</label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">-- Select --</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <p>Selected Category: {selectedCategory}</p>
    </div>
  );
};

export default CategorySelector;