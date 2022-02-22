import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import { TaskAlt } from "@mui/icons-material";
import PriceBox from "./PriceBox";

const CurrentPriceTableCell = ({ content, assetCode, changeCol }) => {
  useEffect(() => {
    if (assetCode === undefined) {
      return;
    }

    if (!window.__jindo2_callback) window.__jindo2_callback = {};

    if (!window.__jindo2_callback[`_${assetCode}`]) {
      Object.defineProperty(window.__jindo2_callback, `_${assetCode}`, {
        value: (res) => {
          console.log(res);
          changeCol(parseInt(res["result"]["areas"][0]["datas"][0]["nv"]));

          console.log("delete", document.getElementById(`${assetCode}`));
          document
            .getElementById(`${assetCode}`)
            .parentNode.removeChild(document.getElementById(`${assetCode}`));
        },
        writable: true,
      });
    } else {
      window.__jindo2_callback[`_${assetCode}`] = (res) => {
        console.log(res);
        changeCol(parseInt(res["result"]["areas"][0]["datas"][0]["nv"]));

        console.log("delete", document.getElementById(`${assetCode}`));
        document
          .getElementById(`${assetCode}`)
          .parentNode.removeChild(document.getElementById(`${assetCode}`));
      };
    }

    let scriptTag = document.createElement("script");
    scriptTag.src = `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${assetCode}|SERVICE_RECENT_ITEM:${assetCode}&_callback=window.__jindo2_callback._${assetCode}`;
    scriptTag.id = `${assetCode}`;
    document.body.append(scriptTag);
  }, []);

  return assetCode === undefined ? (
    <TableCell
      sx={{
        fontWeight: "bold",
      }}
    >
      <PriceBox price={content}>
        <TaskAlt color="disabled" />
      </PriceBox>
    </TableCell>
  ) : (
    <TableCell
      sx={{
        fontWeight: "bold",
      }}
    >
      <PriceBox price={content}>
        <TaskAlt color="success" />
      </PriceBox>
    </TableCell>
  );
};

export default CurrentPriceTableCell;
