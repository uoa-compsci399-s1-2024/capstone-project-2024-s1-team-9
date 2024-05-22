import React, { useState } from 'react'
import CategorySelector from './Components/CategorySelector.jsx'
import Non_DairyBeverages from './Calculators/Non_DairyBeverages.jsx'
import Footer from './Components/Footer.js'
import DetailsPane from './Components/DetailsPane.jsx'
import ScoreContainer from './Components/ScoreContainer.jsx'
import "./App.css";



function App() {
    const [hsrScore, setHsrScore] = useState(null);
    const [ratingPreview, setRatingPreview] = useState(null);
    const [downloadData, setDownloadData] = useState("");

    const downloadImage = () => {
        if (ratingPreview) {
            const link = document.createElement('a');
            link.href = ratingPreview;
            link.download = 'HSR_Score_Image.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([downloadData], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'hsr_score_details.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <div className="App">
          <h1>Health Star Rating Calculator</h1>
          <div className="main-container">
              <DetailsPane />
              <div className="content-pane">
                  <CategorySelector setGlobalScore={setHsrScore} setRatingPreview={setRatingPreview} setDownloadData={setDownloadData} />
              </div>
              <div className="results-pane">
                  {hsrScore && (
                      <ScoreContainer
                          hsrScore={hsrScore}
                          ratingPreview={ratingPreview}
                          onDownloadImage={downloadImage}
                          onDownloadResults={handleDownload}
                      />
                  )}
              </div>
          </div>
    </div>
  )
}

export default App