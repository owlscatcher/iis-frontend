import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ky from "ky";
import Filter from "./components/Filter/Filter";
import ChartComponent from "./components/Chart/ChartComponent";
import ListComponent from "./components/List/ListComponent";
import NavBarComponent from "./components/Navbar/NavBarComponent";
import CsvDownloaderComponent from "./components/CsvDownloader/CsvDownloaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/scrollable-element.css";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [chartData, setChartData] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState("");
  const [reportRows, setReportRows] = useState([]);
  const [reportColumns, setReportColumns] = useState([]);
  const [isReportLoading, setIsReportLoading] = useState(false);

  async function getData() {
    const result = await ky
      .get("items", { prefixUrl: process.env.REACT_APP_API_HOST })
      .json();
    setData(result);
  }

  async function getChartData(id) {
    const result = await ky
      .get(`data-raw/daily/${id}`, {
        prefixUrl: process.env.REACT_APP_API_HOST,
      })
      .json();
    setChartData(result);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (reportRows.length > 1) {
      setIsReportLoading(false);
      console.log(reportRows);
    }
  }, [reportRows]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleListClick = (event) => {
    getChartData(event.target.id);
    setSelectedPoint(event.target.textContent);
  };

  const handleReportClick = async () => {
    setIsReportLoading(true);
    try {
      await ky
        .get(`data-raw/report/daily/2`, {
          prefixUrl: process.env.REACT_APP_API_HOST,
        })
        .json()
        .then((response) => {
          const headers = [
            {
              id: "name",
              displayName: "Т. контроля",
            },
            {
              id: "layer",
              displayName: "Слой",
            },
            {
              id: "source_time_date",
              displayName: "Дата",
            },
            {
              id: "source_time_time",
              displayName: "Время",
            },
            {
              id: "value",
              displayName: "Значение",
            },
          ];

          const rows = response.map((item) => [
            item.name,
            item.layer,
            new Date(item.source_time).toLocaleString("en-GB"),
            item.value,
          ]);

          setReportRows(rows);
          setReportColumns(headers);
        });
    } catch (error) {
      console.error("Ошибка при загрузке данных", error);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App container">
      <Container>
        <Row>
          <NavBarComponent />
        </Row>
        <Row>
          <Col xs={3} className="ps-0">
            <Row>
              <CsvDownloaderComponent
                datas={reportRows}
                columns={reportColumns}
                isLoading={isReportLoading}
                onClick={handleReportClick}
              />
            </Row>
            <Row>
              <Filter
                className="ps-0 pe-0"
                filter={filter}
                onFilterChange={handleFilterChange}
              />
            </Row>
            <Row>
              <Container
                className="scrollable-element"
                style={{ height: "73vh", overflow: "auto" }}
              >
                <ListComponent data={filteredData} onClick={handleListClick} />
              </Container>
            </Row>
          </Col>

          <Col xs={9} className="pe-0">
            <ChartComponent chartData={chartData} pointName={selectedPoint} />
          </Col>
        </Row>

        <Row></Row>
      </Container>
    </div>
  );
}

export default App;
