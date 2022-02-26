import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";
import React, { useState, useEffect } from "react";
import AssetTable from "./AssetTable";

const fadeIn = keyframes`
  from {
    margin-top: 15vh;
    opacity: 0;
  }
  to {
    margin-top: 0vh;
    opacity: 1;
  }
`;

const PageContent = ({ currentView }) => {
  if (currentView === "main") {
    return (
      <>
        <Box
          sx={{
            flexGrow: 1,
            height: "50vh",
            backgroundColor: "rgba(65,105,225,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontFamily: "'Loto', sans-serif",
            color: "white",
          }}
        >
          <Box sx={{ animation: `${fadeIn} 2s ease-out` }}>
            <Box
              sx={{
                fontWeight: 900,
                fontSize: "10rem",
              }}
            >
              Be Rich.
            </Box>
            <Box
              sx={{ fontWeight: 100, fontSize: "3rem", textAlign: "center" }}
            >
              Using Asset Portfolio
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5vh",
              }}
            ></Box>
          </Box>
        </Box>
      </>
    );
  } else if (currentView === "portfolio") {
    return <AssetTable />;
  }
};

export default PageContent;
