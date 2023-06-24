// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/loginUser/loginUserSlice";
import { MuiBackDrop } from "../Backdrop/Backdrop";

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
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await dispatch(loginUser(values));
      console.log(`login user->${result}`);
      resetForm();
    } catch (error) {
      console.log(`error in login user -> ${error}`);
      resetForm();
    }
  };
  useEffect(() => {
    if (data && data.message) {
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
        </Form>
      )}
    </Formik>
  );
};
