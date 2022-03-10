import { Box } from "@mui/material";

const PriceBox = ({ price, children, currencySymbol = "₩" }) => {
  return (
    <Box
      sx={{
        // display: "flex",
        // flexDirection: "row",
        position: "relative",
        textAlign: "right",
      }}
    >
      <Box sx={{ position: "absolute", left: "1rem" }}>
        {children ? (
          // <Box sx={{ flexGrow: 1, marginRight: "5px", paddingLeft: "43px" }}>
          <Box>{children}</Box>
        ) : (
          <Box
          // sx={{
          //   flexGrow: 1,
          //   fontWeight: "bold",
          //   marginRight: "5px",
          //   paddingLeft: "50px",
          // }}
          >
            {currencySymbol}
          </Box>
        )}
      </Box>
      {price.toLocaleString()}
      {/* <Box sx={{ textAlign: "right" }}>/Box> */}
    </Box>
  );
};

export default PriceBox;
