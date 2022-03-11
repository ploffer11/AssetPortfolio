import React, { useState, useEffect } from "react";

import { TaskAlt } from "@mui/icons-material";
import { Autocomplete, Box } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

// import { autoCompleteList } from "../company";
import PriceBox from "./PriceBox";

const EditableTableCell = ({
  content,
  changeCol,
  align,
  assetCode = null,
  type = "number",
  open = false,
  setOpen = () => {},
  width = null,
  color = "black",
  fontSize = "1rem",
  currencySymbol = "₩",
  setIsUpdateNow = () => {},
}) => {
  const [isEditableNow, setIsEditableNow] = useState(false);
  const [text, setText] = useState(content);
  const [printText, setPrintText] = useState(content);
  const [component, setComponent] = useState(null);

  const textAlign = type === "date" ? "left" : "right";
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
      setPrintText("-");
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
              width,
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
        setComponent(
          <Box
            sx={{
              color,
              fontSize,
            }}
          >
            {printText}
          </Box>
        );
      }
    }
  }, [isEditableNow, text, currencySymbol, printText]);

  return (
    <TableCell
      sx={{
        cursor: "pointer",
        width,
        maxWidth: width,
        overflow: "hidden",
      }}
      align={align}
      onDragStart={(e) => {
        if (isEditableNow) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
      draggable={isEditableNow}
    >
      <Box
        onDoubleClick={() => {
          setIsEditableNow(true);
        }}
        onBlur={() => {
          setIsEditableNow(false);
          changeCol(text);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            setIsEditableNow(false);
            changeCol(text);
          }
        }}
      >
        {component}
      </Box>
    </TableCell>
  );
};

export default EditableTableCell;
