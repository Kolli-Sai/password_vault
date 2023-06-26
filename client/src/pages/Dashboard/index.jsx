import { useEffect, useState } from "react";
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
import { getAllPasswords } from "../../store/getAllPasswords/getAllPasswords";

import { Link } from "react-router-dom";

function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    title: false,
    password: false,
  });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.createPassword);
  const getAllPasswordsStore = useSelector((store) => store.getAllPasswords);

  const [searchQuery, setSearchQuery] = useState("");

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

    // Validate form fields
    const errors = {
      title: !title.trim(),
      password: !password.trim(),
    };

    if (errors.title || errors.password) {
      // Set form errors if any field is empty
      setFormErrors(errors);
      return;
    }

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

        // Dispatch the getAllPasswords action to update the state
        dispatch(getAllPasswords());
      })
      .catch((error) => {
        // API request failed, display error message
        setSnackbarMessage(error.message);
        setSnackbarOpen(true);
      });
  };

  useEffect(() => {
    dispatch(getAllPasswords());
  }, []);

  const filteredPasswords = getAllPasswordsStore.data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <MuiBackDrop isLoading={isLoading} />
      <MuiBackDrop isLoading={getAllPasswordsStore.isLoading} />
      <div className={styles.search}>
        <div
          style={{
            width: "100%",
          }}
        >
          <TextField
            style={{ marginRight: "8px", width: "100%" }}
            placeholder="Search..."
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
            error={formErrors.title}
            helperText={formErrors.title ? "Title is required" : ""}
          />
          <TextField
            label="Password"
            fullWidth
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "8px" }}
            error={formErrors.password}
            helperText={formErrors.password ? "Password is required" : ""}
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

      <div className={styles.display}>
        {filteredPasswords.length > 0 ? (
          <div className={styles.passwordsContainer}>
            {filteredPasswords.map((item) => (
              <Link
                to={`/password/${item._id}`}
                key={item._id}
                className={styles.passwordItem}
              >
                <h2>{item.title}</h2>
              </Link>
            ))}
          </div>
        ) : (
          <p>No passwords found.</p>
        )}
      </div>

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
