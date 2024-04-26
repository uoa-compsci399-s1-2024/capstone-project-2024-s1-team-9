import React, { useState } from 'react';
import './NonDairyStyles.css';


const Non_DairyBeverages = () => {
  const [product, setProduct] = useState('');
  const [company, setCompany] = useState('');
  const [energy, setEnergy] = useState('');
  const [totalSugars, setTotalSugars] = useState('');
  const [fvnl, setFvnl] = useState('');
  const [hsrScore, setHsrScore] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/non_dairy_beverages/input', {
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

      const data = await response.json();
      
      setError(null);

      
      const scoreResponse = await fetch('/non_dairy_beverages/score');
      if (!scoreResponse.ok) {
        throw new Error('Failed to get HSR score.');
      }
      const scoreData = await scoreResponse.json();
      setHsrScore(scoreData.nonDairyBevsScore);
      console.log('HSR score:', scoreData.nonDairyBevsScore);

    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    
      <div className="form-container">
        <h2>Non-Dairy Beverages Form</h2>
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
          <button type="submit" className="button">Submit</button>
        </form>
  
        {hsrScore && (
          <div className="score-container">
            <h2>HSR Score:</h2>
            <p>{hsrScore}</p>
          </div>
        )}
  
        {error && <p className="error">{error}</p>}
      </div>
    
  );
};

export default Non_DairyBeverages;
