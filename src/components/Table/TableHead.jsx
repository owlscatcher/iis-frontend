import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => (
          <th key={accessor}>{label}</th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      accessor: PropTypes.string,
    })
  ).isRequired,
};
