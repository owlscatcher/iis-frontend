import React, {useState, useEffect} from'react';
import { Container,  Row, Col } from'react-bootstrap';
import ky from "ky";
import Filter from './components/Filter/Filter';
import ChartComponent from './components/Chart/ChartComponent';
import ListComponent from './components/List/ListComponent';
import NavBarComponent from './components/Navbar/NavBarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  async function getData() {
    const result = await ky.get('items', { prefixUrl: 'http://localhost:3000' }).json();
    setData(result);
  }
  useEffect(() => {
    getData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleListClick = (event) => {
    console.log(event);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App container">
      <Container>
        <Row>
          <NavBarComponent />
        </Row>

        <Row>
          <Col xs={3} className='ps-0'>
            <Filter className="ps-0 pe-0" filter={filter} onFilterChange={handleFilterChange} />
            <ListComponent data={filteredData} onClick={handleListClick} />
          </Col>

          <Col xs={9}>
            <ChartComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
