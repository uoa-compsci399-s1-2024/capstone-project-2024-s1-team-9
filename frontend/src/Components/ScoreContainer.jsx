import React from 'react';
import { Button } from 'react-bootstrap';

const ScoreContainer = ({ hsrScore, ratingPreview, onDownloadImage, onDownloadResults }) => {
    return (
        <div className="score-container">
            <h2>HSR Score:</h2>
            <p>{hsrScore}/5</p>
            <img src={ratingPreview} alt="Health Star Rating Score" />
            {ratingPreview && <Button onClick={onDownloadImage}>Download Image</Button>}
            <button onClick={onDownloadResults}>Download Results</button>
        </div>
    );
};

export default ScoreContainer;