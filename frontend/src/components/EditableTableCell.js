import { Box } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

const EditableTableCell = ({ content, changeCol, align, type = "number" }) => {
  const [isEditableNow, setIsEditableNow] = useState(false);
  const [text, setText] = useState(content);

  console.log("render editable cell");
  return (
    <TableCell sx={{ cursor: "pointer" }} align={align}>
      <Box
        sx={{ width: "90%" }}
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
        {isEditableNow ? (
          <TextField
            size="small"
            value={text}
            variant="standard"
            sx={{
              "& input": {
                textShadow: "1px 1px 1px black",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              if (type === "number") {
                let num = parseInt(event.target.value);
                setText(isNaN(num) ? 0 : num);
              } else setText(event.target.value);
            }}
            autoFocus
          />
        ) : (
          <Box>{text.toLocaleString()}</Box>
        )}
      </Box>
    </TableCell>
  );
};

export default EditableTableCell;
