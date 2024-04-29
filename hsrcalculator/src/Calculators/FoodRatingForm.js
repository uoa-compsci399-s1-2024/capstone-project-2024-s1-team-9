import React, { useState } from "react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
          
      const response = await fetch("/hsr/input" , {
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
      console.log(selectedCategory)
      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }
      console.log("Form submitted successfully!");
      calculateHSRScore();
    } catch (error) {
      console.error("Error:", error); 
      setError("Error occurred while submitting the form."); 
    }
    setLoading(false); 
  };

  const calculateHSRScore = async () => {
    try {
      const response = await fetch("/hsr/score");
      if (!response.ok) {
        throw new Error("Failed to calculate HSR score.");
      }
      const data = await response.json();
      setHsrScore(data.hsrProfilerScore);
    } catch (error) {
      console.error("Error:", error); 
      setError("Error occurred while calculating HSR score."); 
    }
  };

  return (
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
        <label>Energy (kJ): </label>
        <input
          type="number"
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
          required />
        </div> 

        <div>
        <label>Saturated Fat: </label>
        <input
          type="number"
          value={satFat}
          onChange={(e) => setSatFat(e.target.value)}
          required
          placeholder="(g/100g)" />
        </div> 

        <div>
        <label>Total Sugars : </label>
        <input
          type="number"
          value={totalSugars}
          onChange={(e) => setTotalSugars(e.target.value)}
          required 
          placeholder="(g/100g)"/>
        </div> 

        <div>
        <label>Sodium : </label>
        <input
          type="number"
          value={sodium}
          onChange={(e) => setSodium(e.target.value)}
          required
          placeholder="(mg/100g)" />
        </div> 

        <div>
        <label>Fibre : </label>
        <input
          type="number"
          value={fibre}
          onChange={(e) => setFibre(e.target.value)}
          required 
          placeholder="(g/100g)"/>
        </div> 

        <div>
        <label>Protien : </label>
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          required 
          placeholder="(g/100g)"/>
        </div> 

        <div>
        <label>ConcFruitVeg : </label>
        <input
          type="number"
          value={concFruitVeg}
          onChange={(e) => setConcFruitVeg(e.target.value)}
          required 
          placeholder="(%)"
          />
        
        </div>

        <div>
        <label>FVNL : </label>
        <input
          type="number"
          value={fvnl}
          onChange={(e) => setFvnl(e.target.value)}
          required
          placeholder="(%)" />
        </div>

      <div>
      <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Calculate"}
        </button>
      </div>
      {error && <div>{error}</div>}
      {hsrScore && <div>HSR Score: {hsrScore}</div>}
    </form>
  );
};

export default FoodRatingForm;
