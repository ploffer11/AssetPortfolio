import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const wheelCallback = useCallback((e) => {
    e.preventDefault();
    console.log(currentPage);
    if (e.deltaY > 0) {
      let scroll =
        (currentPage === totalPage - 1 ? 0.25 : 1.0) * window.innerHeight;
      window.scrollBy({
        top: scroll,
        left: 0,
        behavior: "smooth",
      });
      if (currentPage !== totalPage) {
        ref.current.removeEventListener("wheel", wheelCallback, {
          passive: false,
        });
        setCurrentPage(currentPage + 1);
      }
    } else {
      let scroll = -(currentPage === 2 ? 0.25 : 1.0) * window.innerHeight;
      window.scrollBy({
        top: scroll,
        left: 0,
        behavior: "smooth",
      });
      if (currentPage !== 0) {
        ref.current.removeEventListener("wheel", wheelCallback, {
          passive: false,
        });
        setCurrentPage(currentPage - 1);
      }
    }
  });

  useEffect(() => {
    // ref.current.addEventListener("wheel", wheelCallback, { passive: false });
  }, [ref, currentPage]);

  return (
    <Box className="main-container" ref={ref}>
      <Box className="main-fade-in-section flex-center">
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

      <Box className="main-description-section flex-center">
        <Box className="main-section">
          <Box
            className="main-section-grid-left"
            sx={{ borderBottom: "1px solid rgb(150, 150, 150)" }}
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
            sx={{ borderBottom: "1px solid rgb(150, 150, 150)" }}
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
