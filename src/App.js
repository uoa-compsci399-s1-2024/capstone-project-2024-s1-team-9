import "./App.css";
import "./Components/calculator/calculator.jsx";
import calculator from "./Components/calculator/calculator.jsx";
import "./Components/category/CategorySelector.jsx";
import CategorySelector from "./Components/category/CategorySelector.jsx";"./Components/category/CategorySelector.jsx";
function App() {
  return (
    <div className="App">
      <h1 className="title">Health Sar Rating Calculator</h1>
      <div className="underline1"></div>
      {CategorySelector()}
      {calculator()}

    </div>
  );
}

export default App;
