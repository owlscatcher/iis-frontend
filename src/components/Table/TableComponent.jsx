import React from "react";
import { Card, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/scrollable-element.css";

export default function TableComponent({ data, openModal }) {
  const columns = [
    { label: "", accessor: "chart" },
    { label: "Id", accessor: "id" },
    { label: "Канал", accessor: "name" },
    { label: "Начало архива", accessor: "first_time" },
    { label: "Послед. обновление", accessor: "source_time" },
    { label: "Значение", accessor: "value" },
    { label: "Кол.", accessor: "count" },
    { label: "Тип", accessor: "type" },
  ];

  return (
    <Card
      className="shadow border border-0 scrollable-element"
      style={{ height: "85vh", overflow: "auto" }}
    >
      <Table className="table table-hover">
        <caption>Таблица мониторинга IIS</caption>
        <TableHead columns={columns} />
        <TableBody columns={columns} data={data} openModal={openModal} />
      </Table>
    </Card>
  );
}

Table.propTypes = {
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
