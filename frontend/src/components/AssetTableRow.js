import React, { useState, useRef } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

import EditableTableCell from "./EditableTableCell";
import EarningRateTableCell from "./EarningRateTableCell";
import CurrentPriceTableCell from "./CurrentPriceTableCell";
import AutoCompleteTableCell from "./AutoCompleteTableCell";
import PriceBox from "./PriceBox";
import useStore from "../state";
import "../scss/tableRow.scss";
import StockChart from "./StockChart";
import { Box, Button } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const AssetTableRow = ({ row }) => {
  const {
    changeAsset,
    insertToIndex,
    insertFromIndex,
    setInsertToIndex,
    setInsertFromIndex,
    placeholder,
    setPlaceholder,
    insertAsset,
    sortAsset,
    checked,
    setCheckedIndex,
  } = useStore();

  const changeCols = (cols) => {
    changeAsset(row.index, cols);
  };

  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [openChart, setOpenChart] = useState(false);

  let {
    index,
    orderIndex,
    name,
    buyPrice,
    sellPrice,
    count,
    assetCode,
    description,
    isUpdateNow,
    currency,
    currencySymbol,
  } = row;

  return (
    <>
      <TableRow
        id="asset-table-row"
        ref={ref}
        draggable="true"
        onDragStart={(e) => {
          console.log("DRAG START", row);
          sortAsset();
          setInsertToIndex(orderIndex);
          setInsertFromIndex(orderIndex);

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
        onDragOver={(e) => {
          // console.log("DRAG OVER", e.target.tagName);
          e.preventDefault();
          if (e.target.tagName === "TD") {
            placeholder.style.display = "table-row";
            let insertElement = ref.current;
            if (e.nativeEvent.offsetY > e.target.parentNode.clientHeight / 2) {
              insertElement = insertElement.nextSibling;
              if (insertToIndex !== index + 1) setInsertToIndex(index + 1);
            } else {
              if (insertToIndex !== index) setInsertToIndex(index);
            }
            insertElement.parentNode.insertBefore(placeholder, insertElement);
          }
        }}
        onDragEnd={(e) => {
          console.log("DRAG END", insertFromIndex, insertToIndex);
          if (
            !(
              insertFromIndex === insertToIndex ||
              insertFromIndex + 1 === insertToIndex
            )
          ) {
            ref.current.parentNode.insertBefore(ref.current, placeholder);
            insertAsset(insertFromIndex, insertToIndex);
          }
          placeholder.parentNode.removeChild(placeholder);
          ref.current.style.opacity = 1;
        }}
      >
        <TableCell>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "rgba(0,153,102,1)",
              },
            }}
            checked={checked[index + 1] || false}
            onChange={(e) => setCheckedIndex(index + 1, e.target.checked)}
          />
        </TableCell>
        <TableCell>{orderIndex + 1}</TableCell>

        <AutoCompleteTableCell
          changeCols={changeCols}
          content={name}
          type="text"
        />

        <EditableTableCell
          content={count}
          changeCol={(col) => changeCols({ count: col })}
          type="number"
        />
        <EditableTableCell
          content={buyPrice}
          changeCol={(col) => changeCols({ buyPrice: col })}
          currencySymbol={currencySymbol}
          type="price"
        />
        {isUpdateNow && assetCode ? (
          <CurrentPriceTableCell
            content={sellPrice}
            assetCode={assetCode}
            changeCols={changeCols}
            setIsUpdateNow={(open) => {
              setOpen(open);
              changeCols({ isUpdateNow: false });
            }}
          />
        ) : (
          <EditableTableCell
            content={sellPrice}
            assetCode={assetCode}
            changeCol={(col) => changeCols({ sellPrice: col })}
            questionMark
            open={open}
            setOpen={setOpen}
            setIsUpdateNow={() => {
              setOpen(false);
              changeCols({ isUpdateNow: true });
            }}
            type="price"
          />
        )}
        <TableCell>
          <PriceBox price={buyPrice * count} currencySymbol={currencySymbol} />
        </TableCell>
        <TableCell>
          <PriceBox price={sellPrice * count} currencySymbol={currencySymbol} />
        </TableCell>
        <EarningRateTableCell
          buyPrice={buyPrice * count}
          evalPrice={sellPrice * count}
        />
        <EditableTableCell
          content={description}
          type="text"
          changeCol={(col) => changeCols({ description: col })}
        />
        <TableCell
          sx={{
            display: "inline",
            position: "absolute",
            marginLeft: "-3.2rem",
            // marginTop: "1rem",
            border: "none",
          }}
        >
          <IconButton onClick={() => setOpenChart(!openChart)}>
            {openChart ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      {openChart && assetCode ? (
        <TableRow>
          <TableCell colSpan="10">
            <StockChart
              name={name}
              assetCode={assetCode}
              currencySymbol={currencySymbol}
              currency={currency}
            />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

export default AssetTableRow;
