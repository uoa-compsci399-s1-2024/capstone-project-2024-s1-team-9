import React, { useState } from 'react';
import './calculator.css';
import ResetForm from '../Components/ResetForm';

const BACKEND_URL = 'https://backend-service-5ufi.onrender.com';
//Remember to add ${BACKEND_URL} to fetch() before create pull request
const Non_DairyBeverages = () => {
  const [product, setProduct] = useState('');
  const [company, setCompany] = useState('');
  const [energy, setEnergy] = useState('');
  const [totalSugars, setTotalSugars] = useState('');
  const [fvnl, setFvnl] = useState('');
  const [hsrScore, setHsrScore] = useState(null);
  const [error, setError] = useState(null);
  const [ratingpreview, setratingpreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await fetch(`${BACKEND_URL}/non_dairy_beverages/input`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product,
          company,
          energy: parseFloat(energy),
          totalSugars: parseFloat(totalSugars),
          fvnl: parseFloat(fvnl),
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.details[0].message);
        }
        throw new Error("Failed to submit form.");
      }

      
      setError(null);

      
      const scoreResponse = await fetch(`${BACKEND_URL}/non_dairy_beverages/score`);
      if (!scoreResponse.ok) {
        throw new Error('Failed to get HSR score.');
      }
      const scoreData = await scoreResponse.json();
      setHsrScore(scoreData.nonDairyBevsScore);
      console.log('HSR score:', scoreData.nonDairyBevsScore);
      setratingpreview(`/rating-svg/${scoreData.nonDairyBevsScore}stars.svg`);

    } catch (error) {
      console.error('Error:', error);
      setHsrScore(null);
      setratingpreview(null);
      setError(error.message);
    }
  setLoading(false);
  };
  const resetForm = () => {
    setProduct('');
    setCompany('');
    setEnergy('');
    setTotalSugars('');
    setFvnl('');
    setError(null);
    setHsrScore(null);
    setratingpreview(null);
  };
  return (
    <>
    
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Product: </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Company: </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Energy (kJ per 100g): </label>
            <input
              type="number"
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Total Sugars (g/100g): </label>
            <input
              type="number"
              value={totalSugars}
              onChange={(e) => setTotalSugars(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">FVNL (%): </label>
            <input
              type="number"
              value={fvnl}
              onChange={(e) => setFvnl(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Calculating..." : "Calculate"}
          </button>
          
        </form>
        {error && <p className="error">{error}</p>}
        {hsrScore && (
          <div className="score-container">
            <h3>Health Star Rating:</h3>
            <p>{hsrScore}</p>
          </div>
        )}
        {ratingpreview && (
          <div className="preview-container">
            <h3>Lable Preview:</h3> 
            <img src={ratingpreview} alt="" />
          </div>
        )}
      </div>
      <ResetForm resetForm={resetForm}/>
      </>
    
  );
};

export default Non_DairyBeverages;
