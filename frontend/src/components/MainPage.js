import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const MainPage = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <Button>
              <HomeIcon color="primary" />
            </Button>
            <Button variant="outlined" size="large">
              포트폴리오
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              <Button variant="outlined" size="large">
                자산 평가
              </Button>
            </Box>
            <Button variant="outlined" size="large">
              로그인
            </Button>
            <Button variant="outlined" size="large">
              회원 가입
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          height: "30vh",
          backgroundColor: "rgba(65,105,225,1)",
        }}
      ></Box>
    </div>
  );
};

export default MainPage;
