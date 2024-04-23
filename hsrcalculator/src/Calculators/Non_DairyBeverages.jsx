import React, { useState } from 'react';

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
        throw new Error('Failed to submit form.');
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
      setError('Error occurred while submitting the form.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product: </label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company: </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Energy (kJ): </label>
          <input
            type="number"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total Sugars : </label>
          <input
            type="number"
            value={totalSugars}
            onChange={(e) => setTotalSugars(e.target.value)}
            required
          />
        </div>
        <div>
          <label>FVNL : </label>
          <input
            type="number"
            value={fvnl}
            onChange={(e) => setFvnl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {hsrScore && (
        <div>
          <h2>HSR Score:</h2>
          <p>{hsrScore}</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Non_DairyBeverages;
