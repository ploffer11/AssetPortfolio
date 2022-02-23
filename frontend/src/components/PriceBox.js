import { Box } from "@mui/material";

const PriceBox = ({ price, children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {children ? (
        <Box sx={{ flexGrow: 1, marginRight: "5px", paddingLeft: "43px" }}>
          {children}
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            marginRight: "5px",
            paddingLeft: "50px",
          }}
        >
          ₩
        </Box>
      )}

      <Box sx={{ textAlign: "right" }}>{price.toLocaleString()}</Box>
    </Box>
  );
};

export default PriceBox;
