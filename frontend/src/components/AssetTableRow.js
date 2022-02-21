import React, { useState, useEffect, useRef, useCallback } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

import EditableTableCell from "./EditableTableCell";
import EarningRateTableCell from "./EarningRateTableCell";
import CurrentPriceTableCell from "./CurrentPriceTableCell";
import getAssetCode from "../CompanyManager";

const AssetTableRow = ({
  row,
  changeRow,
  checked,
  setChecked,
  insertAsset,
  insertIdx,
  setInsertIdx,
}) => {
  const ref = useRef(null);

  const closure = (colName) => {
    return (newCol) => {
      row[colName] = newCol;
      changeRow(row);
    };
  };
  const placeholder = document.getElementById("placeholder");

  useEffect(() => {
    placeholder.style.display = "none";
  }, []);

  return (
    <TableRow
      key={row.name}
      sx={{
        backgroundColor:
          row.name === "새로운 자산" ? "rgba(221,220,218,1)" : "transparent",
      }}
      ref={ref}
      draggable="true"
      onDragStart={(e) => {
        console.log("DRAG START");
        setInsertIdx(row.idx - 1);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("text/html", ref.current);
        ref.current.style.opacity = 0.5;
      }}
      onDragEnd={(e) => {
        console.log("DRAG END", row.idx - 1, insertIdx);
        if (!(row.idx - 1 === insertIdx || row.idx === insertIdx)) {
          ref.current.parentNode.insertBefore(ref.current, placeholder);
          insertAsset(row.idx - 1, insertIdx);
        }
        ref.current.parentNode.appendChild(placeholder);
        placeholder.style.display = "none";
        ref.current.style.opacity = 1;
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (e.target.tagName === "TD") {
          placeholder.style.display = "table-row";
          let insertElement = e.target.parentNode;
          if (e.nativeEvent.offsetY > e.target.parentNode.clientHeight / 2) {
            insertElement = insertElement.nextSibling;
          }

          e.target.parentNode.parentNode.insertBefore(
            placeholder,
            insertElement
          );

          if (insertElement.firstChild.nextSibling !== null) {
            console.log(
              +insertElement.firstChild.nextSibling.innerText - 1,
              "<----"
            );
            let currentIdx =
              +insertElement.firstChild.nextSibling.innerText - 1;
            if (insertIdx !== currentIdx)
              setInsertIdx(+insertElement.firstChild.nextSibling.innerText - 1);
          }
        }
      }}
    >
      <TableCell>
        <Checkbox
          sx={{
            "&.Mui-checked": {
              color: "rgba(0,153,102,1)",
            },
          }}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </TableCell>
      <TableCell>{row.idx}</TableCell>

      <EditableTableCell
        content={row.name}
        type="text"
        changeCol={closure("name")}
      />

      <EditableTableCell content={row.count} changeCol={closure("count")} />
      <EditableTableCell content={row.price} changeCol={closure("price")} />
      {getAssetCode(row.name) === undefined ? (
        <EditableTableCell
          content={row.currentPrice}
          changeCol={closure("currentPrice")}
          questionMark
        />
      ) : (
        <CurrentPriceTableCell
          content={row.currentPrice}
          assetCode={getAssetCode(row.name)}
          changeCol={closure("currentPrice")}
        />
      )}
      <TableCell>{(row.price * row.count).toLocaleString()}</TableCell>
      <TableCell>{(row.currentPrice * row.count).toLocaleString()}</TableCell>
      <EarningRateTableCell
        buyPrice={row.price * row.count}
        evalPrice={row.currentPrice * row.count}
      />
      <EditableTableCell
        content={row.buyDate}
        type="date"
        changeCol={closure("buyDate")}
      />
      <EditableTableCell
        content={row.goalDate}
        type="date"
        changeCol={closure("goalDate")}
      />
      <EditableTableCell
        content={row.sellDate}
        type="date"
        changeCol={closure("sellDate")}
      />
    </TableRow>
  );
};

export default AssetTableRow;
