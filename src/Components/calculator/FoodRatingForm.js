import React, { useState } from "react";

const FoodRatingForm = () => {
  const [category, setCategory] = useState("");
  const [foodName, setFoodName] = useState("");
  const [company, setCompany] = useState("");
  const [energy, setEnergy] = useState("");
  const [saturatedFat, setSaturatedFat] = useState("");
  const [totalSugars, setTotalSugars] = useState("");
  const [sodium, setSodium] = useState("");
  const [fibre, setFibre] = useState("");
  const [protein, setProtein] = useState("");
  const [concFruitVeg, setConcFruitVeg] = useState("");
  const [fvnl, setFvnl] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      // get api endpoint from backend team
      const response = await fetch("put api endpoint here" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // not sure if this is the correct json body, need to check with backend team
        body: JSON.stringify({
          category,
          foodName,
          company,
          energy,
          saturatedFat,
          totalSugars,
          sodium,
          fibre,
          protein,
          concFruitVeg,
          fvnl,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error); 
      setError("Error occurred while submitting the form."); 
    }
    setLoading(false); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category: </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="Dairy Beverages">Dairy Beverages</option>
          <option value="Foods">Foods</option>
          <option value="Dairy Foods">Dairy Foods</option>
          <option value="Fats, Oils">Fats, Oils</option>
          <option value="Cheeses">Cheeses</option>
        </select>
      </div>
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
          value={saturatedFat}
          onChange={(e) => setSaturatedFat(e.target.value)}
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
        <button type="submit" onSubmit={console.log("test")}>Calculate</button>
      </div>
    </form>
  );
};

export default FoodRatingForm;