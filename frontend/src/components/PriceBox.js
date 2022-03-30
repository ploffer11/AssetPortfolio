import { Box } from "@mui/material";

const PriceBox = ({
  price,
  children,
  currencySymbol = "₩",
  textAlign = "right",
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        textAlign,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: `${textAlign === "right" ? 1 : -1}rem`,
        }}
      >
        {children ? <Box>{children}</Box> : <Box>{currencySymbol}</Box>}
      </Box>
      {price.toLocaleString()}
    </Box>
  );
};

export default PriceBox;
