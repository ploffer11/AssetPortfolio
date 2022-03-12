import React, { useState, useEffect } from "react";

import { TaskAlt } from "@mui/icons-material";
import { Autocomplete, Box } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

import PriceBox from "./PriceBox";
import axios from "axios";

const AutoCompleteTableCell = ({
  content,
  align,
  changeCols,
  width = null,
}) => {
  const [isEditableNow, setIsEditableNow] = useState(false);
  const [text, setText] = useState(content);
  const [autoCompleteList, setAutoCompleteList] = useState([]);

  useEffect(() => {
    if (isEditableNow) {
      axios
        .get(process.env.REACT_APP_SERVER_HOST + `/yahoo/auto?query=${text}`)
        .then((res) => {
          setAutoCompleteList(
            res.data.autoCompleteList
              .filter((option) => option.shortname && option.symbol)
              .map((option) => {
                option.label =
                  option.symbol +
                  " | " +
                  option.longname +
                  " | " +
                  option.shortname;
                return option;
              })
          );
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [text]);

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
          changeCols({ name: text });
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            setIsEditableNow(false);
            changeCols({ name: text });
          }
        }}
        sx={{
          "& .MuiPaper-root": { width: "100rem" },
          "& li": { width: "100rem" },
        }}
      >
        {!isEditableNow ? (
          <Box>{text !== null && text !== "" ? text : "-"}</Box>
        ) : (
          <Autocomplete
            disablePortal
            value={text || ""}
            options={autoCompleteList}
            noOptionsText="No Option Found."
            onInputChange={(e, value) => {
              if (value.includes(" | ")) {
                let [assetCode, longname, shortname] = value.split(" | ");
                let name = longname === "undefined" ? shortname : longname;
                console.log(assetCode, name);
                changeCols({ assetCode, description: name });
                setText(name);
              } else {
                setText(value);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asset Name"
                sx={{ width: "100%" }}
                autoFocus
              />
            )}
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
        )}
      </Box>
    </TableCell>
  );
};

export default AutoCompleteTableCell;
