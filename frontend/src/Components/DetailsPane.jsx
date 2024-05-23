import React from 'react';
import './DetailsPane.css';

const DetailsPane = () => {
    return (
        <div className="details-content">
            <h1>Extra Information</h1>

            <h3>Unit Quantity</h3>
            <ul>
                <li>If food is solid or semi-solid use 100g</li>
                <li>If food is a beverage or other liquid food use 100ml</li>
            </ul>
            <br></br>
            <h3>Inputs</h3>
            <ul>
                <li>Users must enter the content of the food, as displayed on the nutrition information panel.</li>
            </ul>
            <br></br>
            <h3>Cheese</h3>
            <ul>
                <li>If the food item is cheese or processed cheese and the calcium content is less than or equal to 320mg/100g please select Category: Food</li>
            </ul>
            <br></br>
            <h3>Concentrated and Non-concentrated FVNL</h3>
            <ul>
                <li>These are from the formulation or recipe and may or may not be displayed on the ingredients panel.</li>
                <li>These together must not exceed 100 as it is a percentage of the total product.</li>
            </ul>
            <br></br>
            <h3>Minimally Processed Packaged Products</h3>
            <ul>
                <li>If a product is minimally processed and meets the following definition it is <strong>eligible for an automatic HSR of 5.</strong></li>
                <li>Fruit (excluding coconut), vegetables, fungi and legumes that have only been peeled, cut and/or surface treated, and/or blanched and/or frozen, or canned without additional fats, sugars, sweeteners or salt.</li>
            </ul>

        </div>
    );
};

export default DetailsPane;
