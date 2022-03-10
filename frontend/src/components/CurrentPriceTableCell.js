import React, { useEffect } from "react";
import axios from "axios";

import TableCell from "@mui/material/TableCell";
import { TaskAlt } from "@mui/icons-material";

import PriceBox from "./PriceBox";

const CurrentPriceTableCell = ({
  content,
  assetCode,
  changeSellPrice,
  changeCurrency,
  changeCurrencySymbol,
  setIsUpdateNow,
  width,
}) => {
  useEffect(() => {
    (async () => {
      let res = await axios.get(
        process.env.REACT_APP_SERVER_HOST +
          `/yahoo/asset?assetCode=${assetCode}`
      );
      changeSellPrice(res.data.price);
      changeCurrency(res.data.currency);
      changeCurrencySymbol(res.data.currencySymbol);
    })();
  }, [assetCode]);

  return (
    <TableCell
      sx={{
        fontWeight: "bold",
        cursor: "pointer",
        width,
      }}
      onDoubleClick={() => setIsUpdateNow(true)}
    >
      <PriceBox price={content}>
        <TaskAlt color="success" onClick={() => setIsUpdateNow(false)} />
      </PriceBox>
    </TableCell>
  );
};

export default CurrentPriceTableCell;
