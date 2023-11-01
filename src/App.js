import React, {useState, useEffect} from'react';
import { Container,  Row, Col } from'react-bootstrap';
import ky from "ky";
import Filter from './components/Filter/Filter';
import ChartComponent from './components/Chart/ChartComponent';
import ListComponent from './components/List/ListComponent';
import NavBarComponent from './components/Navbar/NavBarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/scrollable-element.css'

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [chartData, setChartData] = useState([])
  const [selectedPoint, setSelectedPoint] = useState('');

  async function getData() {
    const result = await ky.get('items', { prefixUrl: 'http://localhost:3000' }).json();
    setData(result);
  }

  async function getChartData(id) {
    const result = await ky.get(`data-raw/daily/${id}`, { prefixUrl: 'http://localhost:3000' }).json();
    setChartData(result);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleListClick = (event) => {
    getChartData(event.target.id);
    setSelectedPoint(event.target.textContent);
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
          <Col xs={3} className='ps-0' >
            <Row>
              <Filter className="ps-0 pe-0" filter={filter} onFilterChange={handleFilterChange} />
            </Row>
            <Row>
              <Container  className='scrollable-element' style={{ height: "80vh", overflow: 'auto'}} >
                <ListComponent data={filteredData} onClick={handleListClick} />
              </Container>
            </Row>
          </Col>

          <Col xs={9} className='pe-0'>
            <ChartComponent chartData={chartData} pointName={selectedPoint}/>
          </Col>
        </Row>

        <Row></Row>
      </Container>
    </div>
  );
}

export default App;
