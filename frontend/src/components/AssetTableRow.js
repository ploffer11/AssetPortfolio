import React, { useState, useRef } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

import EditableTableCell from "./EditableTableCell";
import EarningRateTableCell from "./EarningRateTableCell";
import CurrentPriceTableCell from "./CurrentPriceTableCell";
import AutoCompleteTableCell from "./AutoCompleteTableCell";
import { getAssetCode } from "../company";
import PriceBox from "./PriceBox";
import TotalPriceCell from "./TotalPriceCell";

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
  const [open, setOpen] = useState(false);
  let {
    index,
    name,
    buyPrice,
    sellPrice,
    count,
    assetCode,
    description,
    isUpdateNow,
    currencySymbol,
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

      <AutoCompleteTableCell
        content={name}
        type="text"
        changeName={closure("name")}
        changeAssetCode={closure("assetCode")}
        changeDescription={closure("description")}
        width="17rem"
      />

      <EditableTableCell
        content={count}
        changeCol={closure("count")}
        align="right"
        width="4rem"
      />
      <EditableTableCell
        content={buyPrice}
        changeCol={closure("buyPrice")}
        type="price"
        width="9rem"
        currencySymbol={currencySymbol}
      />
      {isUpdateNow && assetCode ? (
        <CurrentPriceTableCell
          name={name}
          content={sellPrice}
          assetCode={assetCode}
          changeSellPrice={closure("sellPrice")}
          changeCurrency={closure("currency")}
          changeCurrencySymbol={closure("currencySymbol")}
          setIsUpdateNow={(open) => {
            console.log("open true!");
            setOpen(open);
            closure("isUpdateNow")(false);
          }}
          width="9rem"
        />
      ) : (
        <EditableTableCell
          content={sellPrice}
          changeCol={closure("sellPrice")}
          questionMark
          type="price"
          open={open}
          setOpen={setOpen}
          setIsUpdateNow={() => {
            setOpen(false);
            closure("isUpdateNow")(true);
          }}
          assetCode={assetCode}
          width="9rem"
        />
      )}
      <TableCell>
        <PriceBox price={buyPrice * count} currencySymbol={currencySymbol} />
      </TableCell>
      {/* <TotalPriceCell asset={asset} /> */}
      <TableCell>
        <PriceBox price={sellPrice * count} currencySymbol={currencySymbol} />
      </TableCell>
      <EarningRateTableCell
        buyPrice={buyPrice * count}
        evalPrice={sellPrice * count}
      />
      {/* <TableCell
        sx={{
          textAlign: "left",
          width: "6rem",
          maxWidth: "6rem",
          overflow: "scroll",
        }}
      >
        {assetCode}
      </TableCell> */}
      {/* <EditableTableCell
        content={assetCode}
        type="date"
        changeCol={closure("assetCode")}
        align="left"
        width="6rem"
      /> */}
      <EditableTableCell
        content={description}
        type="text"
        changeCol={closure("description")}
        align="left"
        width="20rem"
        color="gray"
        fontSize="0.8rem"
      />
    </TableRow>
  );
};

export default AssetTableRow;
