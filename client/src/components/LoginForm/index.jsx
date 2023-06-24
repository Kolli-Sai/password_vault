// eslint-disable-next-line no-unused-vars
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import * as Yup from "yup";

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
  const handleSubmit = (values) => {
    // Handle form submission logic here
    console.log(values);
  };

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
        </Form>
      )}
    </Formik>
  );
};
