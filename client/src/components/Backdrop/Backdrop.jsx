// eslint-disable-next-line no-unused-vars
import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

// eslint-disable-next-line react/prop-types
function MuiBackDrop({ isLoading }) {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress
          sx={{
            color: "#871774",
          }}
        />
      </Backdrop>
    </>
  );
}

export { MuiBackDrop };
