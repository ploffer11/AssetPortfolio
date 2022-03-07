import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import CanvasJSReact from "../canvas/canvasjs.stock.react";
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const StockChart = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [cookies, setCookie] = useCookies(["authorization"]);

  useEffect(() => {
    (async () => {
      let res = await axios.get(
        process.env.REACT_APP_SERVER_HOST +
          `/yahoo?authorization=${cookies.authorization}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(
        res.data.map((data) => {
          return {
            x: new Date(data.date),
            y: data.close,
          };
        })
      );

      setDataPoints(
        res.data.map((data) => {
          return {
            x: new Date(data.date),
            y: data.close,
          };
        })
      );
    })();
  }, []);

  const options = {
    title: {
      text: "React StockChart with Spline Area Chart",
    },
    theme: "light2",
    subtitles: [
      {
        text: "BTC/USD",
      },
    ],
    charts: [
      {
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM DD YYYY",
          },
        },
        axisY: {
          title: "Portfolio",
          prefix: "￦",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "$#,###.##",
          },
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            name: "Price (in USD)",
            type: "splineArea",
            color: "#3576a8",
            yValueFormatString: "$#,###.##",
            xValueFormatString: "MMM DD YYYY",
            dataPoints: dataPoints,
          },
        ],
      },
    ],
    navigator: {
      slider: {
        minimum: new Date("2021-03-06"),
        maximum: new Date("2022-03-06"),
      },
    },
  };
  const containerProps = {
    width: "90vw",
    height: "50vh",
    margin: "auto",
  };
  return (
    <>
      <CanvasJSStockChart containerProps={containerProps} options={options} />
    </>
  );
};

export default StockChart;
