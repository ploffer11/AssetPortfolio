import React, { useState, useEffect, useRef, useCallback } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

import EditableTableCell from "./EditableTableCell";
import EarningRateTableCell from "./EarningRateTableCell";
import CurrentPriceTableCell from "./CurrentPriceTableCell";
import getAssetCode from "../CompanyManager";
import PriceBox from "./PriceBox";

const AssetTableRow = ({
  row,
  changeRow,
  checked,
  setChecked,
  insertAsset,
  insertIdx,
  setInsertIdx,
  placeholder,
  setPlaceholder,
}) => {
  const ref = useRef(null);

  const closure = (colName) => {
    return (newCol) => {
      row[colName] = newCol;
      changeRow(row);
    };
  };

  useEffect(() => {
    // placeholder.style.display = "none";
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
        console.log("DRAG START", e.nativeEvent.path);
        setInsertIdx(row.idx - 1);

        let copyRow = ref.current.cloneNode(true);
        copyRow.style.display = "none";
        copyRow.style.backgroundColor = "rgba(160,218,169,1)";
        ref.current.parentNode.appendChild(copyRow);
        setPlaceholder(copyRow);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("text/html", ref.current);
        ref.current.style.opacity = 0.3;
      }}
      onDragEnd={(e) => {
        console.log("DRAG END", row.idx - 1, insertIdx);
        if (!(row.idx - 1 === insertIdx || row.idx === insertIdx)) {
          ref.current.parentNode.insertBefore(ref.current, placeholder);
          insertAsset(row.idx - 1, insertIdx);
        }
        placeholder.parentNode.removeChild(placeholder);
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
            let currentIdx =
              +insertElement.firstChild.nextSibling.innerText - 1;
            if (insertIdx !== currentIdx)
              setInsertIdx(+insertElement.firstChild.nextSibling.innerText - 1);
          }
        }
      }}
    >
      <TableCell sx={{ width: "40px" }}>
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
      <TableCell sx={{ width: "40px" }}>{row.idx}</TableCell>

      <EditableTableCell
        content={row.name}
        type="text"
        changeCol={closure("name")}
      />

      <EditableTableCell
        content={row.count}
        changeCol={closure("count")}
        align="right"
      />
      <EditableTableCell
        content={row.price}
        changeCol={closure("price")}
        type="price"
      />
      {/* {getAssetCode(row.name) === undefined ? (
        <EditableTableCell
          content={row.currentPrice}
          changeCol={closure("currentPrice")}
          questionMark
          type="price"
        />
      ) : ( */}
      <CurrentPriceTableCell
        content={row.currentPrice}
        assetCode={getAssetCode(row.name)}
        changeCol={closure("currentPrice")}
      />
      {/* )} */}
      <TableCell>
        <PriceBox price={row.price * row.count} />
      </TableCell>
      <TableCell>
        <PriceBox price={row.currentPrice * row.count} />
      </TableCell>
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
