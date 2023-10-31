import { React } from "react";
import { ListGroup } from "react-bootstrap";

function ListComponent({ data, onClick }) {
  return (
    <ListGroup onClick={onClick}>
      {data.map((dt) => (
        <ListGroup.Item action key={dt.id}>{dt.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ListComponent;
