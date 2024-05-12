import React, { useState } from 'react';

const Buscador = ({ handleSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    handleSearch(value);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar colaborador"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Buscador;
