import React, { useState } from 'react';
import './calculator.css';
import ResetForm from '../Components/ResetForm';

const BACKEND_URL = 'https://backend-service-5ufi.onrender.com';

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
        const response = await fetch('${BACKEND_URL}/non_dairy_beverages/input', {
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
        const errorData = await response.json();
        throw new Error(errorData.details[0].message);
      }

      
      setError(null);

      
      const scoreResponse = await fetch('${BACKEND_URL}/non_dairy_beverages/score');
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
    
      <div className="main-container">
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
            <label className="label">Energy (kJ): </label>
            <input
              type="number"
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Total Sugars : </label>
            <input
              type="number"
              value={totalSugars}
              onChange={(e) => setTotalSugars(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">FVNL : </label>
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
  
        {hsrScore && (
          <div className="score-container">
            <h2>HSR Score:</h2>
            <p>{hsrScore}</p>
            <img src={ratingpreview} alt="" />
          </div>
        )}
  
        {error && <p className="error">{error}</p>}
      </div>
      <ResetForm resetForm={resetForm}/>
      </>
    
  );
};

export default Non_DairyBeverages;
