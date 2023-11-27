import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TableBody({ columns, data, openModal }) {
  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {columns.map(({ accessor }) => {
            let tData = row[accessor] ? row[accessor] : "——";
            if (accessor === "chart") {
              tData = (
                <Button
                  type="button"
                  onClick={openModal}
                  className="btn btn-light"
                  data-id={row.id}
                  data-pointname={row.name}
                >
                  <Icon.GraphUp />
                </Button>
              );
            }
            if (accessor === "value") {
              tData = row.value[0].value;
            }
            return <td key={accessor}>{tData}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      accessor: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      first_time: PropTypes.string,
      last_time: PropTypes.string,
      count: PropTypes.number,
      type: PropTypes.number,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
