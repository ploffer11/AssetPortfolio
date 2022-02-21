import React, { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import { Box, Button } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const SortButton = ({ text, sortAscend, sortDescend, focus, setFocus }) => {
  const [ascend, setAscend] = useState(true);

  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "inline",
      }}
      onClick={() => {
        setFocus();
        if (ascend) sortAscend();
        else sortDescend();
        setAscend(!ascend);
      }}
    >
      {text}
      {focus ? (
        <Icon>{!ascend ? <ArrowDownward /> : <ArrowUpward />}</Icon>
      ) : null}
    </Box>
  );
};

export default SortButton;
