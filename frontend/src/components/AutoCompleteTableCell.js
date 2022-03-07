import React, { useState, useEffect } from "react";

import { TaskAlt } from "@mui/icons-material";
import { Autocomplete, Box } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

import PriceBox from "./PriceBox";
import axios from "axios";

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
  const [autoCompleteList, setAutoCompleteList] = useState([]);

  const textAlign = "left";

  useEffect(() => {
    if (isEditableNow) {
      if (type === "text") {
        axios
          .get(process.env.REACT_APP_SERVER_HOST + `/yahoo/auto?query=${text}`)
          .then((res) => {
            console.log(res.data.quotes);
            setAutoCompleteList(
              res.data.quotes
                .filter((option) => option.shortname && option.symbol)
                .map((option) => {
                  console.log(
                    option.symbol,
                    option.longname || option.shortname
                  );
                  option.label =
                    option.symbol +
                    " | " +
                    option.longname +
                    " | " +
                    option.shortname;
                  return option;
                })
            );
          });

        setComponent(
          <Autocomplete
            value={text || ""}
            options={autoCompleteList}
            noOptionsText="No Option Found."
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asset Name"
                sx={{ width: "100%" }}
                autoFocus
              />
            )}
            onInputChange={(e, value) => {
              console.log(value);
              setText(value);
            }}
            disablePortal
            renderOption={(props, option) => {
              return (
                <Box {...props} sx={{ display: "flex", fontSize: "1.3rem" }}>
                  <Box
                    sx={{
                      position: "inline",
                      width: "16rem",
                      fontWeight: "bold",
                    }}
                  >
                    {option.symbol}
                  </Box>
                  <Box sx={{ position: "inline" }}>
                    {option.longname || option.shortname}
                  </Box>
                </Box>
              );
            }}
          />
        );
      }
    } else {
      setComponent(<Box>{text !== null && text !== "" ? text : "-"}</Box>);
    }
  }, [isEditableNow, text]);

  useEffect(() => {
    if (autoCompleteList.length !== 0) {
      console.log("autocomplete changed", autoCompleteList);
      setComponent(
        <Autocomplete
          value={text || ""}
          options={autoCompleteList}
          noOptionsText="No Option Found."
          disablePortal
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
          renderOption={(props, option) => {
            return (
              <Box {...props} sx={{ display: "flex", fontSize: "1.3rem" }}>
                <Box
                  sx={{
                    position: "inline",
                    width: "16rem",
                    fontWeight: "bold",
                  }}
                >
                  {option.symbol}
                </Box>
                <Box sx={{ position: "inline", width: "40rem" }}>
                  {option.longname || option.shortname}
                </Box>
                <Box
                  sx={{
                    position: "inline",
                    width: "30rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  {option.longname && option.shortname}
                </Box>
              </Box>
            );
          }}
          isOptionEqualToValue={() => false}
        />
      );
    }
  }, [autoCompleteList]);

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
        sx={{
          "& .MuiPaper-root": { width: "100rem" },
          "& li": { width: "100rem" },
        }}
      >
        {component}
      </Box>
    </TableCell>
  );
};

export default EditableTableCell;
