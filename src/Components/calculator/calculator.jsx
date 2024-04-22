import React from 'react';
import './calculator.css';
import logo1  from "../Assets/category.svg";
import logo2  from "../Assets/energy.svg";
import logo3  from "../Assets/food.svg";

const calculator = () => {
    return (
        <div className='container'>
           <div className="header">
            <div className="text">Input information</div>
            <div className="underline"></div>
            </div> 
            <div className="inputs">
                <div className="input">
                    
                    <label className='Category'></label>
                    <img src={logo1} alt="category" className="category-logo"/>
                    <input type="string" placeholder="Category"/>
                </div>
                <div className="input">
                <img src={logo2} alt="category" className="category-logo"/>
                    <label className='Food Name'></label>
                    
                    <input type="food-name" placeholder="Food name"/>
                </div>
                <div className="input">
                    <label className='Energy'></label>
                    <img src={logo3} alt="category" className="category-logo"/>
                    <input type="string" placeholder="Energy (kj)"/>
                </div>
                <div className="reset-values">Reset Values --{`>`}<span> Reset</span></div>
                <div className="submit-container">
                    <div className="submit">
                        Calculate
                    </div>
                </div>
            </div>
        </div>
    );
};

export default calculator;