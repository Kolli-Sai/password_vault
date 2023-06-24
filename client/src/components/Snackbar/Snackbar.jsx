// eslint-disable-next-line no-unused-vars
import React from "react";
import { Alert, Snackbar } from "@mui/material";

// eslint-disable-next-line react/prop-types
function MuiSnackBar({ handleClose, message, open }) {
  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity="success" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export { MuiSnackBar };
