import { TaskAlt } from "@mui/icons-material";
import { Box } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import React, { useState, useRef, useEffect } from "react";
import PriceBox from "./PriceBox";

const EditableTableCell = ({
  content,
  changeCol,
  align,
  type = "number",
  edit = false,
  setIsUpdateNow = () => {},
}) => {
  const [isEditableNow, setIsEditableNow] = useState(false);
  const [text, setText] = useState(content);
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
        {isEditableNow ? (
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
        ) : type === "price" ? (
          edit ? (
            <PriceBox price={text}>
              <TaskAlt color="disable" onClick={() => setIsUpdateNow()} />
            </PriceBox>
          ) : (
            <PriceBox price={text} />
          )
        ) : (
          <Box>{text.toLocaleString()}</Box>
        )}
      </Box>
    </TableCell>
  );
};

export default EditableTableCell;
