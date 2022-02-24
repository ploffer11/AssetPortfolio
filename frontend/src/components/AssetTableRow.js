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
    idx,
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
        console.log("DRAG START", e.nativeEvent.path);
        setInsertIdx(idx - 1);

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
        console.log("DRAG END", idx - 1, insertIdx);
        if (!(idx - 1 === insertIdx || idx === insertIdx)) {
          ref.current.parentNode.insertBefore(ref.current, placeholder);
          insertAsset(idx - 1, insertIdx);
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
          checked={checked || false}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </TableCell>
      <TableCell sx={{ width: "40px" }}>{idx}</TableCell>

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
      />
      <EditableTableCell
        content={goalDate}
        type="date"
        changeCol={closure("goalDate")}
      />
      <EditableTableCell
        content={sellDate}
        type="date"
        changeCol={closure("sellDate")}
      />
    </TableRow>
  );
};

export default AssetTableRow;
