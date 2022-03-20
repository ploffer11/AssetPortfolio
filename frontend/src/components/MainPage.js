import React, { useState, useEffect, useRef } from "react";
import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import { GitHub, LinkedIn } from "@mui/icons-material";

import "../scss/index.scss";
import "../scss/main.scss";

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

const MainPage = () => {
  const totalPage = 2;
  const [currentPage, setCurrentPage] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        console.log(e.deltaY, window.scrollY);
        if (e.deltaY > 0) {
          window.scrollBy({
            top: window.innerHeight,
            left: 0,
            behavior: "smooth",
          });
        } else {
          window.scrollBy({
            top: -window.innerHeight,
            left: 0,
            behavior: "smooth",
          });
        }
      },
      { passive: false }
    );
  }, [ref]);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(65,105,225,1)",
        fontFamily: "'Loto', sans-serif",
      }}
      ref={ref}
    >
      <Box
        sx={{
          marginTop: "6vh",
          height: "60vh",
          marginBottom: "34vh",
          flexDirection: "column",
          color: "white",
        }}
        className="flex-center"
      >
        <Box sx={{ animation: `${fadeIn} 2s ease-out` }}>
          <Box
            sx={{
              fontWeight: 900,
              fontSize: "8rem",
            }}
          >
            Be Rich.
          </Box>
          <Box sx={{ fontWeight: 100, fontSize: "3rem", textAlign: "center" }}>
            Using Asset Portfolio
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          flexDirection: "column",
          fontFamily: "'Loto', sans-serif",
          color: "white",
        }}
        className="flex-center"
      >
        <Box className="main-section">
          <Box
            className="main-section-grid-left"
            sx={{ borderBottom: "1px solid white" }}
          >
            <Box className="main-section-img">
              <img src="./img/cash.jpg" />
            </Box>

            <Box className="main-section-text">
              <h2>Manage your asset</h2>
              <p>
                Asset portfolio는 당신의 모든 자산을 자유롭게 관리할 수
                있습니다.
              </p>
            </Box>
          </Box>

          <Box
            className="main-section-grid-right"
            sx={{ borderBottom: "1px solid white" }}
          >
            <Box className="main-section-text">
              <h2>Real time update</h2>
              <p>
                Yahoo Finance에서 제공하는 모든 자산에 대한 실시간 가격
                업데이트를 지원합니다. 주식, 코인, ETF 등 다양한 자산의 가격을
                실시간으로 받아 포트폴리오를 관리할 수 있습니다.
              </p>
            </Box>

            <Box className="main-section-img">
              <img src="./img/stock.jpg" />
            </Box>
          </Box>

          <Box className="main-section-grid-left">
            <Box className="main-section-img">
              <img src="./img/design2.jpg" />
            </Box>
            <Box className="main-section-text">
              <h2>User oriented design</h2>
              <p>유저 지향적인 UI/UX를 즐겨보세요.</p>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="flex-center main-footer" component="footer">
        <p>Made by ploffer11</p>
        <Box>
          <button className="clear-button">
            <a href="https://github.com/ploffer11/">
              <GitHub />
            </a>
          </button>
          <button className="clear-button">
            <a href="https://www.linkedin.com/in/ploffer11/">
              <LinkedIn />
            </a>
          </button>
        </Box>
        <Box className="main-footer-contact">Contact: ploffer11@naver.com</Box>
      </Box>
    </Box>
  );
};

export default MainPage;
