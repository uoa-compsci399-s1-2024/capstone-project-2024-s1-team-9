import React, { useState } from "react";
import ResetForm from "../Components/ResetForm";
import './calculator.css';
import { Button } from 'react-bootstrap'; 
import { Tooltip } from 'react-tooltip';
import ScoreContainer from "../Components/ScoreContainer";

const BACKEND_URL = 'https://backend-service-5ufi.onrender.com';

const FoodRatingForm = ({ selectedCategory, setSelectedCategory, setGlobalScore, setRatingPreview, setDownloadData }) => {
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
      setGlobalScore(data.hsrProfilerScore); // Setting global score
      setRatingPreview(`/rating-svg/${data.hsrProfilerScore}stars.svg`); // Setting global preview image
      const textContent = `
          Food Name: ${foodName}
          Company: ${company}
          Energy: ${energy} kJ
          Saturated Fat: ${satFat} g/100g
          Total Sugars: ${totalSugars} g/100g
          Sodium: ${sodium} mg/100g
          Fibre: ${fibre} g/100g
          Protein: ${protein} g/100g
          Concentrated Fruit and Vegetable: ${concFruitVeg} %
          FVNL: ${fvnl} %
          HSR Score: ${data.hsrProfilerScore}
      `;
      setDownloadData(textContent);
    } catch (error) {
      console.error("Error:", error);
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
    setSelectedCategory("");
    setGlobalScore(null);
    setRatingPreview(null);
    setDownloadData("");
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
    <>
    <div className="main-form-container">
      <div className="content-wrapper">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Food Name: </label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                
              />
            </div>
            <div>
              <label>Business: </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                
              />
            </div>
            <div>
              <label>Energy (kJ/100g or /100ml): </label>
              <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                required
              />
              
            </div>
            <div>
              <label>Saturated Fat (g/100g or /100ml): </label>
              <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
                value={satFat}
                onChange={(e) => setSatFat(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Total Sugars (g/100g or /100ml): </label>
              <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
                value={totalSugars}
                onChange={(e) => setTotalSugars(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Sodium (mg/100g or /100ml): </label>
              <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
                value={sodium}
                onChange={(e) => setSodium(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Fibre (g/100g or /100ml): </label>
              <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
                value={fibre}
                onChange={(e) => setFibre(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Protein (g/100g or /100ml): </label>
              <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                required
              />
            </div>
            <div>
                <div className="foodtip1">
                  <label>Concentrated Fruit and Vegetable (%): </label>
                  <span
                    data-tooltip-id="concFruitVegTooltip"
                    data-tooltip-content="Percentage of concentrated (or dried) fruit or vegetable ingredients in the food."
                    data-tooltip-place="right"
                  >
                    <Button className="tooltip1" variant="success">What is this?</Button>
                  </span>
                  <Tooltip id="concFruitVegTooltip" />
                </div>
              <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
                value={concFruitVeg}
                onChange={(e) => setConcFruitVeg(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
                <div className="foodtip1">
                  <label className="fvnl-label"> Non-Concentrated FVNL (%): </label>
                  <span
                    data-tooltip-id="fvnlTooltip"
                    data-tooltip-content="Percentage of the non-concentrated fruit, nuts, legumes, and vegetable ingredients in the food."
                    data-tooltip-place="right"
                  >
                    <Button className="tooltip2" variant="success">What is this?</Button>
                  </span>
                  <Tooltip id="fvnlTooltip" />
                </div>
              <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
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
            <ResetForm resetForm={resetForm} />
          </form>
        </div>
        
        {hsrScore && (
            <ScoreContainer
                hsrScore={hsrScore}
                ratingPreview={setRatingPreview}
            />
        )}
      </div>
    </div>
    </>
  );
};

export default FoodRatingForm;
