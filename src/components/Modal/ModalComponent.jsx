import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ChartComponent from "../Chart/ChartComponent";
import GetData from "../../services/GetData";

export default function ModalComponent({
  selectedId,
  pointName,
  show,
  handleClose,
}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    GetData(`data-raw/daily/${selectedId}`).then((result) => {
      setChartData(result);
    });
  }, [selectedId]);

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>График за сутки для {pointName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChartComponent chartData={chartData} pointName={pointName} />
      </Modal.Body>
    </Modal>
  );
}
