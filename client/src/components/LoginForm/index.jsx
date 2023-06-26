import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Snackbar } from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/loginUser/loginUserSlice";
import { MuiBackDrop } from "../Backdrop/Backdrop";
import { setToken } from "../../store/isAuthenticated/isAuthenticatedSlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 special symbol, 1 number, and be 8-16 characters long"
    ),
});

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data, error } = useSelector((store) => store.loginUser);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    await dispatch(loginUser(values))
      .unwrap()
      .then((result) => {
        console.log(`login user->${result}`);
        resetForm();
        setSnackbarColor("success");
        setSnackbarMessage("Login successful");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.log(`error in login user -> ${error}`);
        resetForm();
        setSnackbarColor("error");
        setSnackbarMessage("Login failed. Please try again.");
        setSnackbarOpen(true);
      });
  };

  useEffect(() => {
    if (data && data.message) {
      console.log(data);
      localStorage.setItem("token", data.token);
      dispatch(setToken(data.token));
      navigate("/dashboard");
    }
  }, [data && data?.message, dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            as={TextField}
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            color="secondary"
            error={!!(errors.email && touched.email)}
            helperText={<ErrorMessage name="email" />}
          />

          <Field
            as={TextField}
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            color="secondary"
            error={!!(errors.password && touched.password)}
            helperText={<ErrorMessage name="password" />}
          />
          <button className="primary-button" type="submit">
            Login
          </button>
          <MuiBackDrop isLoading={isLoading} />
          {error && <p className="red">{error}</p>}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            severity={snackbarColor}
          />
        </Form>
      )}
    </Formik>
  );
};
