import "./App.css";
import "./Components/calculator/calculator.jsx";
import calculator from "./Components/calculator/calculator.jsx";
function App() {
  return (
    <div className="App">
      <h1 className="title">Health Sar Rating Calculator</h1>
      <div className="underline1"></div>
      <div className="paragraph">
        <p1 className>this is a cool health star calculator</p1>
      </div>

      {calculator()}
    </div>
  );
}

export default App;
