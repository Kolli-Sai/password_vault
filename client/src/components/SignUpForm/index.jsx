// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../store/createUser/createUserSlice";
import { useNavigate } from "react-router-dom";
import { MuiBackDrop } from "../Backdrop/Backdrop";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must be 8-16 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 special symbol, and 1 number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

// Initial form values
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data, error } = useSelector((store) => store.createUser);
  const handleSignup = async (values, { resetForm }) => {
    delete values.confirmPassword;
    try {
      const result = await dispatch(createUser(values));
      console.log(`createUser -> ${result.meta}`);

      resetForm();
    } catch (error) {
      console.log(`error in createUser -> ${error}`);
      resetForm();
    }
  };
  useEffect(() => {
    if (data && data.message) {
      navigate("/login");
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignup}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            as={TextField}
            type="text"
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            color="secondary"
            error={!!(errors.name && touched.name)}
            helperText={<ErrorMessage name="name" />}
          />
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
          <Field
            as={TextField}
            type="password"
            label="confirmPassword"
            name="confirmPassword"
            variant="outlined"
            fullWidth
            margin="normal"
            color="secondary"
            error={!!(errors.confirmPassword && touched.confirmPassword)}
            helperText={<ErrorMessage name="confirmPassword" />}
          />

          <button className="primary-button" type="submit">
            {isLoading ? "SigningUp..." : "SignUp"}
          </button>
          <MuiBackDrop isLoading={isLoading} />
          {error && <p className="red">{error}</p>}
        </Form>
      )}
    </Formik>
  );
};
