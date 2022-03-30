import React, { useState, useEffect } from "react";

import { TaskAlt } from "@mui/icons-material";
import { Box } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import PriceBox from "./PriceBox";

const MobileEditableTableCell = ({
  content,
  assetCode,
  changeCol,
  type,
  currencySymbol = "₩",
  open = false,
  setOpen = () => {},
  setIsUpdateNow = () => {},
}) => {
  const [isEditableNow, setIsEditableNow] = useState(false);
  const [text, setText] = useState(content);
  const [printText, setPrintText] = useState(content);
  const [component, setComponent] = useState(null);
  const textAlign = type === "date" || type === "text" ? "left" : "right";

  useEffect(() => {
    if (open) {
      setIsEditableNow(true);
      setOpen(false);
    }
  }, [open]);

  useEffect(() => {
    setText(content);
  }, [content]);

  useEffect(() => {
    if (text === null || text === "") {
      setPrintText(type === "text" ? "-" : "0");
    } else if (type === "number") {
      setPrintText(parseInt(text).toLocaleString());
    } else if (type === "price") {
      setPrintText(parseFloat(text).toLocaleString());
    } else {
      setPrintText(text.toLocaleString());
    }
  }, [text]);

  useEffect(() => {
    if (isEditableNow) {
      setComponent(
        <TextField
          size="small"
          value={text || ""}
          variant="standard"
          sx={{
            "& input": {
              fontWeight: "bold",
              textAlign,
              width: "100%",
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            setText(event.target.value);
          }}
          autoFocus
        />
      );
    } else {
      if (type === "price") {
        if (!assetCode) {
          setComponent(
            <PriceBox price={printText} currencySymbol={currencySymbol} />
          );
        } else {
          setComponent(
            <PriceBox price={printText} currencySymbol={currencySymbol}>
              <TaskAlt color="disable" onClick={() => setIsUpdateNow()} />
            </PriceBox>
          );
        }
      } else {
        setComponent(<Box>{printText}</Box>);
      }
    }
  }, [isEditableNow, text, currencySymbol, printText]);

  return (
    <TableCell
      sx={{
        cursor: "pointer",
        overflow: "hidden",
      }}
      onBlur={() => {
        setIsEditableNow(false);
        changeCol(text);
      }}
      onClick={() => {
        setIsEditableNow(true);
      }}
    >
      <Box>{component}</Box>
    </TableCell>
  );
};

export default MobileEditableTableCell;
