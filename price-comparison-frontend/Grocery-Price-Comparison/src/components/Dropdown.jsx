import React, { useState } from "react";


const Dropdown = ({ stores, onSelect }) => {
  const handleSelect = (e) => {
    const store = e.target.value;
    if (store) {
      onSelect(store);
      e.target.value = "";
    }
  };

  return (
    <select onChange={handleSelect} defaultValue="">
      <option value="">-- Select Store --</option>
      {stores.map((store, index) => (
        <option key={index} value={store}>
          {store}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
