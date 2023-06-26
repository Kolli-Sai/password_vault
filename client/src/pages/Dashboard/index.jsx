import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createPassword } from "../../store/createPassword/createPassword";
import { MuiBackDrop } from "../../components/Backdrop/Backdrop";

function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.createPassword);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      password,
      description,
    };
    handleCloseDialog(); // Close the dialog before showing the Snackbar
    dispatch(createPassword(payload))
      .unwrap()
      .then((result) => {
        // API request succeeded, display success message
        console.log(`create user -> ${result}`);
        setTitle("");
        setPassword("");
        setDescription("");
        setSnackbarMessage("Password created successfully.");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        // API request failed, display error message
        setSnackbarMessage(error.message);
        setSnackbarOpen(true);
      });
  };

  return (
    <div>
      <MuiBackDrop isLoading={isLoading} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          width: "100%",
        }}
      >
        <TextField
          style={{ marginRight: "8px" }}
          placeholder="Search..."
          color="secondary"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.new} onClick={handleOpenDialog}>
        <AddIcon />
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            style={{
              marginBottom: "8px",
              marginTop: "8px",
            }}
          />
          <TextField
            label="Password"
            fullWidth
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "8px" }}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "8px" }}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <button className="secondary-button" onClick={handleCloseDialog}>
            Cancel
          </button>
          <button className="primary-button" onClick={handleSubmit}>
            Submit
          </button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        variant="success"
      />
    </div>
  );
}

export default Dashboard;
