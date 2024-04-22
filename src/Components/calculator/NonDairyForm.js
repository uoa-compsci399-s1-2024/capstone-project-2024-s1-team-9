import React, {useState} from 'react'

const NonDairyForm = () => {
    const [foodName, setFoodName] = useState("");
    const [company, setCompany] = useState("");
    const [energy, setEnergy] = useState("");
    const [totalSugars, setTotalSugars] = useState("");
    const [fvnl, setFvnl] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // get api data here
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
        <label>Total Sugars : </label>
        <input
          type="number"
          value={totalSugars}
          onChange={(e) => setTotalSugars(e.target.value)}
          required 
          placeholder="(g/100g)"/>
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
        
        </form>
  )
}

export default NonDairyForm