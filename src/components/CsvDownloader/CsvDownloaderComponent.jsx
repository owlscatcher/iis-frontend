import React from "react";
import CsvDownloader from "react-csv-downloader";
import { Button, Spinner } from "react-bootstrap";

export default function CsvDownloaderComponent({datas, columns, isLoading, onClick }) {
  return (
    <>
        <CsvDownloader
          filename={new Date().toLocaleString("en-GB")}
          extension=".csv"
          separator=";"
          columns={columns}
          datas={datas}
        >
          <Button className="bg-light border-0 text-black w-100 mb-2" onClick={onClick}>
            {isLoading ? (
            <Spinner animation="border" role="status" style={{height: "18px", width: "18px"}} />
          ) : ('Скачать отчет')}
          </Button>
        </CsvDownloader>
    </>
  );
}
