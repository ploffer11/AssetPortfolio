import { TaskAlt } from "@mui/icons-material";
import { Autocomplete, Box } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import React, { useState, useRef, useEffect } from "react";
import PriceBox from "./PriceBox";
import { autoCompleteList } from "../company";
import { useInput } from "@mui/base";

const EditableTableCell = ({
  content,
  changeCol,
  align,
  assetCode = undefined,
  type = "number",
  edit = false,
  setIsUpdateNow = () => {},
}) => {
  const [isEditableNow, setIsEditableNow] = useState(false);
  const [text, setText, changeText] = useState(content);
  const [component, setComponent] = useState(null);
  const [width, setWidth] = useState({});

  const ref = useRef(null);

  const textAlign =
    type === "text" ? "left" : type === "date" ? "center" : "right";

  useEffect(() => {
    if (edit) {
      setWidth({ width: `${ref.current.parentNode.clientWidth - 32}px` });
      setIsEditableNow(true);
    }
  }, [edit]);

  useEffect(() => {
    if (isEditableNow) {
      if (type === "text") {
        setComponent(
          <Autocomplete
            options={autoCompleteList}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asset Name"
                sx={{ width: "100%" }}
                autoFocus
              />
            )}
            onInputChange={(e) => {
              console.log(e);
              if (e.target.innerText) {
                setText(e.target.innerText);
              } else {
                setText(e.target.value);
              }
            }}
            onHighlightChange={(e) => {
              if (e) {
                if (e.relatedTarget)
                  console.log("highlight", e.relatedTarget.innerText);
                // setText(e.relatedTarget.innerText);
              }
            }}
            onChange={(e) => {
              console.log("change", e);
              console.log("change", e.target);
              console.log("change", e.target.value);
              console.log("change", e.nativeEvent.target.defaultValue);
            }}
            disablePortal
          />
        );
      } else
        setComponent(
          <TextField
            size="small"
            value={text}
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
  }, [isEditableNow]);

  return (
    <TableCell
      sx={{
        cursor: "pointer",
        ...width,
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
        ref={ref}
        onDoubleClick={() => {
          setWidth({ width: `${ref.current.parentNode.clientWidth - 32}px` });
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
