import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import CategorySelector from './Components/CategorySelector.jsx'
import Non_DairyBeverages from './Calculators/Non_DairyBeverages.jsx'
import Footer from './Components/Footer.js'
import "./App.css";



function App() {
  return (
    <div className="App">
    <h1>Health Star Rating Calculator</h1>
    <CategorySelector />
  </div>
  )
}

export default App