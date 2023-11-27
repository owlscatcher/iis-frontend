import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";

import NavBarComponent from "./components/Navbar/NavBarComponent";
import TableComponent from "./components/Table/TableComponent";
import ModalComponent from "./components/Modal/ModalComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/scrollable-element.css";
import GetData from "./services/GetData";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedPointName, setSelectedPointName] = useState("");
  const [filter, setFilter] = useState("");

  const FETCH_DELAY = 10000;

  const ROUTE_PATHS = {
    itemsIndex: "items",
  }

  const setLoop = async () => {
    const interval = setInterval(() => {
      GetData(ROUTE_PATHS.itemsIndex).then((result) => {
        setData(result);
      });
    }, FETCH_DELAY);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    GetData(ROUTE_PATHS.itemsIndex).then((result) => {
      setData(result);

      setIsLoading(false);

      setLoop();
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const openModal = (event) => {
    setSelectedId(event.currentTarget.dataset.id);
    setSelectedPointName(event.currentTarget.dataset.pointname);
    setIsModalOpen(true);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App container">
      <Container>
        <Row>
          <NavBarComponent
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        </Row>
        <Row>
          {isLoading ? (
            <Spinner
              animation="border"
              role="status"
              className="position-absolute top-50 start-50"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <TableComponent data={filteredData} openModal={openModal} />
          )}
          {isModalOpen && (
            <ModalComponent
              selectedId={selectedId}
              pointName={selectedPointName}
              show={isModalOpen}
              handleClose={() => setIsModalOpen(false)}
            />
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
