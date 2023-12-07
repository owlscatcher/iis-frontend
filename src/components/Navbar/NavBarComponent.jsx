import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBarComponent({ filter, onFilterChange }) {
  return (
    <Navbar className="bg-body-tertiary rounded shadow mt-2 mb-4">
      <Container>
        <Navbar.Brand>IIS v0.1.3b</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-start">
          <input
            className="form-control rounded"
            type="text"
            placeholder="Поиск..."
            value={filter}
            onChange={onFilterChange}
          />
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ fontSize: "10px" }}>
            Разработчик: <b>Веселов А.Е.</b>
            <br />
            Телефон: <b>43-62</b>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
