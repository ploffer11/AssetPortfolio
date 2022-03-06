import React, { useState, useEffect } from "react";

import { TaskAlt } from "@mui/icons-material";
import { Autocomplete, Box } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

import { autoCompleteList } from "../company";
import PriceBox from "./PriceBox";

const EditableTableCell = ({
  content,
  changeCol,
  align,
  assetCode = undefined,
  type = "number",
  edit = false,
  width = null,
  setIsUpdateNow = () => {},
}) => {
  const [isEditableNow, setIsEditableNow] = useState(false);
  const [text, setText] = useState(content);
  const [component, setComponent] = useState(null);

  const textAlign =
    type === "text" ? "left" : type === "date" ? "center" : "right";

  useEffect(() => {
    if (edit) {
      setIsEditableNow(true);
    }
  }, [edit]);

  useEffect(() => {
    if (isEditableNow) {
      if (type === "text") {
        setComponent(
          <Autocomplete
            value={text || ""}
            options={autoCompleteList}
            noOptionsText="주식이름:종목코드"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asset Name"
                sx={{ width: "100%" }}
                autoFocus
              />
            )}
            onInputChange={(e, value) => {
              setText(value);
            }}
            disablePortal
          />
        );
      } else
        setComponent(
          <TextField
            size="small"
            value={text || ""}
            variant="standard"
            sx={{
              "& input": {
                textShadow: "1px 1px 1px black",
                textAlign: textAlign,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              if (type === "number" || type === "price") {
                let num = parseInt(event.target.value);
                console.log("onchange", isNaN(num) ? 0 : num);
                setText(isNaN(num) ? 0 : num);
              } else setText(event.target.value);
            }}
            autoFocus
          />
        );
    } else {
      if (type === "price") {
        if (assetCode === undefined) {
          setComponent(<PriceBox price={text} />);
        } else {
          setComponent(
            <PriceBox price={text}>
              <TaskAlt color="disable" onClick={() => setIsUpdateNow()} />
            </PriceBox>
          );
        }
      } else {
        setComponent(
          <Box>
            {text !== null && text !== "" ? text.toLocaleString() : "-"}
          </Box>
        );
      }
    }
  }, [isEditableNow, text]);

  return (
    <TableCell
      sx={{
        cursor: "pointer",
        width,
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
