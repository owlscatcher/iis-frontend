import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Filter({ filter, onFilterChange }) {
  return (
    <div className="mb-2">
      <input
        className="form-control rounded"
        type="text"
        placeholder="Поиск..."
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
}
