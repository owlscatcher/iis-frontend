import React, { useState } from "react";
import CsvDownloader from "react-csv-downloader";
import ky from "ky";
import { Button, Spinner } from "react-bootstrap";

export default function CsvDownloaderComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleReportClick = async () => {
    setIsLoading(true);
    try {
      const result = await ky
        .get(`data-raw/report/daily/2`, {
          prefixUrl: process.env.REACT_APP_API_HOST,
        })
        .json();

        console.log("Полученные данные:", result); 
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
          id: "source_time",
          displayName: "Время",
        },
        {
          id: "value",
          displayName: "Значение",
        },
      ];

      const rows = result.map((item) => [
        {
          name: item.name,
          layer: item.layer,
          source_time: item.source_time,
          value: item.value,
        },
      ]);

      console.table(headers);
      console.table(rows);
      setDatas(rows);
      setColumns(headers);
    } catch (error) {
      console.error("Ошибка при загрузке данных", error);
    }

    console.log(datas);
    console.log(columns);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <CsvDownloader
          filename={new Date().toString()}
          extension=".csv"
          separator=";"
          wrapColumnChar="'"
          columns={columns}
          datas={datas}
        >
          <Button disabled={isLoading} onClick={handleReportClick}>
            Download CSV
          </Button>
        </CsvDownloader>
      )}
    </>
  );
}
