import React from 'react';

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