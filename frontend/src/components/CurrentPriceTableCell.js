import React, { useEffect } from "react";
import axios from "axios";

import TableCell from "@mui/material/TableCell";
import { TaskAlt } from "@mui/icons-material";

import PriceBox from "./PriceBox";

let oldAssetCode = null;
const CurrentPriceTableCell = ({
  content,
  assetCode,
  changeCols,
  setIsUpdateNow,
  width,
}) => {
  console.log(
    "old",
    oldAssetCode,
    "new",
    assetCode,
    "===",
    oldAssetCode === assetCode
  );
  oldAssetCode = assetCode;
  useEffect(() => {
    console.log("useEffect assetCode");
    axios
      .get(
        process.env.REACT_APP_SERVER_HOST +
          `/yahoo/asset?assetCode=${assetCode}`
      )
      .then((res) => {
        // changeCols({
        //   sellPrice: res.data.price,
        //   currency: res.data.currency,
        //   currencySymbol: res.data.currencySymbol,
        // });
      })
      .catch((res) => {
        console.log(res);
      });
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
