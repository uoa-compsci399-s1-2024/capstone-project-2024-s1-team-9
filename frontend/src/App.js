import React from 'react'
import CategorySelector from './Components/CategorySelector.jsx'
import Non_DairyBeverages from './Calculators/Non_DairyBeverages.jsx'
import Footer from './Components/Footer.js'
import DetailsPane from './Components/DetailsPane.jsx'
import "./App.css";



function App() {

  return (
    <div className="App">
          <h1>Health Star Rating Calculator</h1>
          <div className="main-container">
              <DetailsPane />
              <div className="content-pane">
                  <CategorySelector />
              </div>
              <div className="results-pane">
              </div>
          </div>
    </div>
  )
}

export default App