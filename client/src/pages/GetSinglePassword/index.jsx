import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPassword } from "../../store/getPassword/getPassword";
import { deletePassword } from "../../store/deletePassword/deletePassword";
import { Snackbar } from "@mui/material";
import styles from "./styles.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";
import { MuiBackDrop } from "../../components/Backdrop/Backdrop";

function GetSinglePassword() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { isLoading, data } = useSelector((store) => store.getPassword);
  const deletePasswordStore = useSelector((store) => store.deletePassword);

  console.log(data);
  useEffect(() => {
    dispatch(getPassword(id));
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleDelete = () => {
    dispatch(deletePassword(data._id));
    navigate("/dashboard");
    setSnackbarMessage("Password deleted successfully.");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <MuiBackDrop isLoading={isLoading || deletePasswordStore.isLoading} />
      <div className={styles.container}>
        <div>
          <Tooltip title="Go Back" placement="top">
            <ArrowBackIcon
              className={styles.goBack}
              sx={{ fontSize: "2rem" }}
              onClick={handleBack}
            />
          </Tooltip>
        </div>
        {data && (
          <div className={styles.passwordCard}>
            <h1>{data.title && `Title: ${data.title}`}</h1>
            <h2>{data.password && `Password: ${data.password}`}</h2>
            <p>{data.description && `Description: ${data.description}`}</p>
          </div>
        )}
        <div className={styles.delete}>
          <button type="submit" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          severity="success" // Set the severity to "success"
        />
      </div>
    </>
  );
}

export default GetSinglePassword;
