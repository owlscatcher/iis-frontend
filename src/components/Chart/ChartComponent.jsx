import React, { useState, useEffect } from "react";
import ky from "ky";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, ToolboxComponent, DataZoomComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import "bootstrap/dist/css/bootstrap.min.css";

export default function ChartComponent() {
  echarts.use(
    [TitleComponent, TooltipComponent, ToolboxComponent, DataZoomComponent, GridComponent, LineChart, CanvasRenderer]
  );

  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  async function getDate() {
    const result = await ky.get('data-raw/3', { prefixUrl: 'http://localhost:3000' }).json();

    const x = [];
    const y = [];
    const filetimeConstant = 116444736e9;

    result.map((data) => {
      x.push(data.value);
      y.push(new Date((data.source_time - filetimeConstant) / 1e4 ));
    });

    console.log(y);

    setXData(x);
    setYData(y);
  }

  useEffect(() => {
    getDate();
  }, []);

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: yData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: xData,
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
  };


  return (
    <div className="card shadow border-0">
      <ReactEChartsCore
        echarts={echarts}
        option={options}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        style={{height: "85vh", padding: "0.8em"}}
      />
    </div>
  );
}
