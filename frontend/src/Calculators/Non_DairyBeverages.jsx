import React, { useState } from 'react';
import './calculator.css';
import ResetForm from '../Components/ResetForm';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap'; 
import ScoreContainer from "../Components/ScoreContainer";

const BACKEND_URL = 'https://backend-service-5ufi.onrender.com';

//Remember to add ${BACKEND_URL} to fetch() before create pull request
const Non_DairyBeverages = ({ selectedCategory, setSelectedCategory, setGlobalScore, setRatingPreview, setDownloadData }) => {
  const [product, setProduct] = useState('');
  const [company, setCompany] = useState('');
  const [energy, setEnergy] = useState('');
  const [totalSugars, setTotalSugars] = useState('');
  const [fvnl, setFvnl] = useState('');
  const [hsrScore, setHsrScore] = useState(null);
  const [error, setError] = useState(null);
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
      setGlobalScore(scoreData.nonDairyBevsScore); // Setting global score
      setRatingPreview(`/rating-svg/${scoreData.nonDairyBevsScore}stars.svg`); // Setting global preview image
      const textContent = `
        Product: ${product}
        Company: ${company}
        Energy: ${energy} kJ
        Total Sugars: ${totalSugars} g/100g
        FVNL: ${fvnl} %
        HSR Score: ${scoreData.nonDairyBevsScore}
      `;
      setDownloadData(textContent);
      console.log('HSR score:', scoreData.nonDairyBevsScore);

    } catch (error) {
      console.error('Error:', error);
      setHsrScore(null);
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
    setRatingPreview(null);
    setSelectedCategory("")
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Percentage of the non-concentrated fruit, nuts, legumes and vegetable ingredients in the food.
    </Tooltip>
  );


  return (
    <>
    <div className="main-form-container">
      <div className="content-wrapper1">
        
    {selectedCategory && ( // Only render the form if a category is selected
  <div className="form-container1">
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
            <label className="label">Business: </label>
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
          <div >
            <div className='non-dairy-fvnl'>

            
            <label className="label"> Non-Concentrated FVNL (%): </label>
            <OverlayTrigger
            placement="right"
            overlay={renderTooltip}
            
          >
            <Button className="tooltip2" variant="success">What is FVNL</Button>
          </OverlayTrigger>
          </div>
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
          {error && <p className="error">{error}</p>}
         <ResetForm resetForm={resetForm}/>
        </form>
        
        {hsrScore && (
            <ScoreContainer
                hsrScore={hsrScore}
                ratingPreview={setRatingPreview}
            />
        )}
       
      </div>
      )}
      </div>
    </div>
      </>
    
  );
};

export default Non_DairyBeverages;
