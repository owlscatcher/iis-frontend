import React from "react";
import { Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBarComponent() {
  return (
    <Navbar className="bg-body-tertiary rounded shadow mt-2 mb-4">
      <Container>
        <Navbar.Brand>IIS v0.0.1</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ fontSize: '10px'}}>
            Разработчик: <b>Веселов А.Е.</b>
            <br/>
            Телефон: <b>43-62</b>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
