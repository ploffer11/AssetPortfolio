import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import CanvasJSReact from "../canvas/canvasjs.stock.react";
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const StockChart = ({ assetCode, currencySymbol, currency, name }) => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await axios.get(
        process.env.REACT_APP_SERVER_HOST +
          `/yahoo/assetHistory?assetCode=${assetCode}`
      );

      console.log(res.data);

      setDataPoints(
        res.data.map((data) => {
          return {
            x: new Date(data.date),
            y: [data.open, data.high, data.low, data.close],
          };
        })
      );
    })();
  }, [assetCode]);

  const options = {
    title: {
      // text: "React StockChart with Spline Area Chart",
    },
    theme: "light2",
    subtitles: [
      {
        text: `${name}/${currency}`,
      },
    ],
    // animationEnabled: true,
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
          // title: "Portfolio",
          prefix: currencySymbol,
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: `${currencySymbol}#,###.##`,
          },
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            name: "Price (in USD)",
            type: "candlestick",
            color: "#3576a8",
            yValueFormatString: `${currencySymbol}#,###.##`,
            xValueFormatString: "MMM DD YYYY",
            dataPoints: dataPoints,
          },
        ],
      },
    ],
    navigator: {
      slider: {
        // minimum: new Date("2021-03-06"),
        // maximum: new Date("2022-03-06"),
      },
    },
  };
  const containerProps = {
    width: "100%",
    height: "50vh",
    margin: "auto",
    fontSize: "1rem",
  };
  return (
    <>
      <CanvasJSStockChart containerProps={containerProps} options={options} />
    </>
  );
};

export default StockChart;
