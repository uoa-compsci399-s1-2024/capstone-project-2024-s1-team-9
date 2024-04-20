import React, { useState } from "react";
import logo1  from "../Assets/category.svg";
import logo2  from "../Assets/energy.svg";
import logo3  from "../Assets/food.svg";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // get api data here
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
        <button type="submit">Calculate</button>
      </div>
    </form>
  );
};

export default FoodRatingForm;