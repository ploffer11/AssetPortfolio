import React, { useState } from "react";

import Icon from "@mui/material/Icon";
import { Box } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useStore from "../state";

const SortButton = ({ text, columnIndex }) => {
  const [ascend, setAscend] = useState(true);
  const { sortColumnIndex, setSortColumnIndex, sortAssetColumn } = useStore();

  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "inline",
        position: "relative",
      }}
      onClick={() => {
        sortAssetColumn(columnIndex, ascend);
        setSortColumnIndex(columnIndex);
        setAscend(!ascend);
      }}
    >
      {text}
      <Box sx={{ display: "inline", position: "absolute" }}>
        {sortColumnIndex === columnIndex ? (
          <Icon>{!ascend ? <ArrowDownward /> : <ArrowUpward />}</Icon>
        ) : null}
      </Box>
    </Box>
  );
};

export default SortButton;
