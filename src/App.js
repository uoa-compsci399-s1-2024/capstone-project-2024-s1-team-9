import "./App.css";
import "./Components/calculator/calculator.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import calculator from "./Components/calculator/calculator.jsx";
import "./Components/category/CategorySelector.jsx";
import CategorySelector from "./Components/category/CategorySelector.jsx";

import Calculator1 from "./Components/calculator/Calculator1.js";

function App() {
  return (
    <div className="App">
      <h1 className="title">Health Star Rating Calculator</h1>
      <div className="underline1"></div>
      <Calculator1 />
      {/* {CategorySelector()} */}
      
      
    </div>
  );
}

export default App;
