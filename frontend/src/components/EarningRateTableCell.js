import TableCell from "@mui/material/TableCell";

const EarningRateTableCell = ({ buyPrice, evalPrice }) => {
  const pickColor = (x, y, i) => {
    i = Math.min(100, Math.abs(parseInt(i)));
    return [
      parseInt((i * y[0] + (100 - i) * x[0]) / 100),
      parseInt((i * y[1] + (100 - i) * x[1]) / 100),
      parseInt((i * y[2] + (100 - i) * x[2]) / 100),
    ];
  };
  let earningRate = ((evalPrice - buyPrice) / buyPrice) * 100;

  // rgba(160, 218, 169, 1) rgba(34, 136, 0, 1)
  let startGreen = [160, 218, 169],
    endGreen = [34, 136, 0];

  // rgba(237,119,119,1) rgba(187,0,17,1)
  let startRed = [237, 119, 119],
    endRed = [187, 0, 17];

  let a = 1;
  let [r, g, b] =
    earningRate >= 0
      ? pickColor(startGreen, endGreen, earningRate)
      : pickColor(startRed, endRed, earningRate);

  if (isNaN(earningRate)) earningRate = 0;
  if (earningRate === 0) {
    r = g = b = 0;
  }
  return (
    <TableCell
      sx={{
        color: `rgba(${r}, ${g}, ${b}, ${a})`,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {(earningRate > 0 ? "+" : "") + earningRate.toFixed(2) + "%"}
    </TableCell>
  );
};

export default EarningRateTableCell;
