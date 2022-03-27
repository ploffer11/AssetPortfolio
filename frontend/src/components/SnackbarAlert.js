import { Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import useStore from "../state";

import Alert from "@mui/material/Alert";

const SnackbarAlert = () => {
  const { snackbarOption, updateSnackbarOption } = useStore();
  const { open, message, severity } = snackbarOption;

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        updateSnackbarOption({ open: false });
      }, 5000);
    }
  }, [open]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        message={message}
      >
        <Alert severity={severity} sx={{ width: "50vw", minWidth: "350px" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarAlert;
