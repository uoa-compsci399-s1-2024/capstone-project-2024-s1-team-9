import React from 'react';
import "../Calculators/calculator.css";

const ResetForm = ({ resetForm }) => {
  const handleReset = () => {
    resetForm();
  };

  return (
    <div className='reset'>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ResetForm;