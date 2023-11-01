import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ChartComponent({ chartData, pointName }) {
  echarts.use([
    TitleComponent,
    TooltipComponent,
    ToolboxComponent,
    DataZoomComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
  ]);

  const dataoptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const options = {
    title: {
      left: 'center',
      text: pointName
    },
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[10], "10%"];
      },
    },
    xAxis: {
      type: "category",
      data: chartData.map((data) => new Date(data.source_time).toLocaleDateString("en-GB", dataoptions)),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: pointName,
        type: "line",
        smooth: true,
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: chartData.map((data) => data.value),
      },
    ],
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 70,
        end: 100,
      },
      {
        start: 70,
        end: 100,
      },
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
        style={{ height: "85vh", padding: "0.8em" }}
      />
    </div>
  );
}
