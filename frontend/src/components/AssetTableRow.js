import React, { useState, useEffect, useRef, useCallback } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

import EditableTableCell from "./EditableTableCell";
import EarningRateTableCell from "./EarningRateTableCell";
import CurrentPriceTableCell from "./CurrentPriceTableCell";
import getAssetCode from "../company";
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
  const [edit, setEdit] = useState(false);
  let {
    index,
    name,
    buyPrice,
    sellPrice,
    count,
    buyDate,
    sellDate,
    goalDate,
    isUpdateNow,
  } = row;

  const closure = (colName) => {
    return (newCol) => {
      if (
        colName === "name" &&
        isUpdateNow === false &&
        getAssetCode(newCol) !== undefined
      ) {
        isUpdateNow = true;
      }
      row[colName] = newCol;
      changeRow(row);
    };
  };

  return (
    <TableRow
      key={name}
      sx={{
        backgroundColor:
          name === "새로운 자산" ? "rgba(221,220,218,1)" : "transparent",
      }}
      ref={ref}
      draggable="true"
      onDragStart={(e) => {
        console.log("DRAG START");
        setInsertIdx(index - 1);

        let copyRow = ref.current.cloneNode(true);
        copyRow.style.display = "none";
        copyRow.style.backgroundColor = "rgba(160,218,169,1)";
        ref.current.parentNode.appendChild(copyRow);
        ref.current.onDragOver = null;
        setPlaceholder(copyRow);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("text/html", ref.current);
        ref.current.style.opacity = 0.3;
      }}
      onDragEnd={(e) => {
        console.log("DRAG END", index - 1, insertIdx);
        if (!(index - 1 === insertIdx || index === insertIdx)) {
          console.log("insert asset called");
          ref.current.parentNode.insertBefore(ref.current, placeholder);
          insertAsset(index - 1, insertIdx);
        }
        placeholder.parentNode.removeChild(placeholder);
        ref.current.style.opacity = 1;
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (e.target.tagName === "TD") {
          placeholder.style.display = "table-row";
          let insertElement = ref.current;
          if (e.nativeEvent.offsetY > e.target.parentNode.clientHeight / 2) {
            insertElement = insertElement.nextSibling;
            setInsertIdx(index);
          } else {
            setInsertIdx(index - 1);
          }
          insertElement.parentNode.insertBefore(placeholder, insertElement);
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
          checked={checked || false}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </TableCell>
      <TableCell sx={{ width: "40px" }}>{index}</TableCell>

      <EditableTableCell
        content={name}
        type="text"
        changeCol={closure("name")}
      />

      <EditableTableCell
        content={count}
        changeCol={closure("count")}
        align="right"
      />
      <EditableTableCell
        content={buyPrice}
        changeCol={closure("buyPrice")}
        type="price"
      />
      {isUpdateNow && getAssetCode(name) !== undefined ? (
        <CurrentPriceTableCell
          content={sellPrice}
          assetCode={getAssetCode(name)}
          changeCol={closure("sellPrice")}
          setIsUpdateNow={(edit) => {
            setEdit(edit);
            closure("isUpdateNow")(false);
          }}
        />
      ) : (
        <EditableTableCell
          content={sellPrice}
          changeCol={closure("sellPrice")}
          questionMark
          type="price"
          edit={edit}
          setIsUpdateNow={() => {
            setEdit(false);
            closure("isUpdateNow")(true);
          }}
          assetCode={getAssetCode(name)}
        />
      )}
      <TableCell>
        <PriceBox price={buyPrice * count} />
      </TableCell>
      <TableCell>
        <PriceBox price={sellPrice * count} />
      </TableCell>
      <EarningRateTableCell
        buyPrice={buyPrice * count}
        evalPrice={sellPrice * count}
      />
      <EditableTableCell
        content={buyDate}
        type="date"
        changeCol={closure("buyDate")}
        align="center"
      />
      <EditableTableCell
        content={goalDate}
        type="date"
        changeCol={closure("goalDate")}
        align="center"
      />
      <EditableTableCell
        content={sellDate}
        type="date"
        changeCol={closure("sellDate")}
        align="center"
      />
    </TableRow>
  );
};

export default AssetTableRow;
