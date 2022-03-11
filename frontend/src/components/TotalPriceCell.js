import { TableCell } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PriceBox from "./PriceBox";

const TotalPriceCell = ({ asset, priceType }) => {
  let [price, setPrice] = useState(0);

  useEffect(() => {
    (async () => {
      let cache = {};
      let totalDollar = 0;
      let totalWon = 0;

      for (let row of asset) {
        let { currency, count } = row;
        let totalPrice = row[priceType] * count;

        if (currency === "KRW") {
          totalWon += totalPrice;
        } else if (cache[currency]) {
          totalDollar += cache[currency] * totalPrice;
        } else {
          let res = await axios.get(
            process.env.REACT_APP_SERVER_HOST +
              `/yahoo/usd?currency=${currency}`
          );
          cache[currency] = res.data.price;
          totalDollar += cache[currency] * totalPrice;
        }
      }
      let res = await axios.get(
        process.env.REACT_APP_SERVER_HOST + "/yahoo/krw"
      );
      setPrice(totalWon + totalDollar * res.data.price);
    })();
  }, [asset]);

  return (
    <TableCell>
      <PriceBox price={parseInt(price)} />
    </TableCell>
  );
};

export default TotalPriceCell;
