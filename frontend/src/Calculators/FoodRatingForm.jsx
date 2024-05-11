import React, { useState } from "react";
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import ResetForm from "../Components/ResetForm";
import './calculator.css';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap'; 
const BACKEND_URL = 'https://backend-service-5ufi.onrender.com';
//Remember to add ${BACKEND_URL} to fetch() before create pull request
const FoodRatingForm = ({ selectedCategory }) => {
  
  const [foodName, setFoodName] = useState("");
  const [company, setCompany] = useState("");
  const [energy, setEnergy] = useState("");
  const [satFat, setSatFat] = useState("");
  const [totalSugars, setTotalSugars] = useState("");
  const [sodium, setSodium] = useState("");
  const [fibre, setFibre] = useState("");
  const [protein, setProtein] = useState("");
  const [concFruitVeg, setConcFruitVeg] = useState("");
  const [fvnl, setFvnl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hsrScore, setHsrScore] = useState(null);
  const [ratingpreview, setratingpreview] = useState(null);

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/hsr/input`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hsrCategory: selectedCategory,
          food: foodName,
          company,
          energy,
          satFat,
          totalSugars,
          sodium,
          fibre,
          protein,
          concFruitVeg,
          fvnl,
        }),
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.details[0].message);
        }
        throw new Error("Failed to submit form.");
      }
      console.log("Form submitted successfully!");
      calculateHSRScore();
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const calculateHSRScore = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/hsr/score`);
      if (!response.ok) {
        throw new Error("Failed to calculate HSR score.");
      }
      const data = await response.json();
      setHsrScore(data.hsrProfilerScore);
      setratingpreview(`/rating-svg/${data.hsrProfilerScore}stars.svg`);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setHsrScore(null);
      setError(error.message);
    }
  };

  const resetForm = () => {
    
    setFoodName("");
    setCompany("");
    setEnergy("");
    setSatFat("");
    setTotalSugars("");
    setSodium("");
    setFibre("");
    setProtein("");
    setConcFruitVeg("");
    setFvnl("");
    setError(null);
    setHsrScore(null);
  };

  const downloadImage = () => {
    if (ratingpreview) {
      const link = document.createElement('a');
      link.href = ratingpreview;
      link.download = 'HSR_Score_Image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextInput = document.getElementById(e.target.getAttribute('data-next'));
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Food Name: </label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
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
          <label>Energy (kJ per 100 g): </label>
          <input
            type="number"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label>Saturated Fat (g/100g): </label>
          <input
            type="number"
            value={satFat}
            onChange={(e) => setSatFat(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label>Total Sugars (g/100g): </label>
          <input
            type="number"
            value={totalSugars}
            onChange={(e) => setTotalSugars(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label>Sodium (mg/100g): </label>
          <input
            type="number"
            value={sodium}
            onChange={(e) => setSodium(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label>Fibre (g/100g): </label>
          <input
            type="number"
            value={fibre}
            onChange={(e) => setFibre(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label>Protein (g/100g): </label>
          <input
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label>Concentrated Fruit and Vegetable (%): </label>
          <OverlayTrigger
          
          placement="right"
          overlay={<Popover id="popover-basic">IDK WHAT TO PUT HERE  </Popover>}
        >
          <Button 
className="tooltip0" 
variant="secondary" 
style={{ fontSize: "14px" }} 
>
What is FVNL
</Button>
        </OverlayTrigger>
          <input
            type="number"
            value={concFruitVeg}
            onChange={(e) => setConcFruitVeg(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label> FVNL (%): </label>
          <OverlayTrigger
          
            placement="right"
            overlay={<Popover id="popover-basic">Fruit Vegtable Nuts and Legumes </Popover>}
          >
            <Button 
  className="tooltip1" 
  variant="secondary" 
  style={{ fontSize: "14px" }} 
>
  What is FVNL
</Button>
          </OverlayTrigger>
          <input
            type="number"
            value={fvnl}
            onChange={(e) => setFvnl(e.target.value)}
            required
          />

        </div>
  
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {hsrScore && (
          <div className="score-container">
          <h2>HSR Score:</h2>
          <p>{hsrScore}/5</p>
          <div><img src={ratingpreview} alt="HealthStar Rating Score" />
          {ratingpreview && <Button onClick={downloadImage}>Download Image</Button>}</div>
          
        </div>
          
          
        )}
      </form>
      <ResetForm resetForm={resetForm} />
    </div>
  );  
};

export default FoodRatingForm;
