import { Button, Container, Paper, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../StyleSheets/account-style.css";
import { UserContext } from "../../Context/userContext";
import { login } from "../../Services/accounts";

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(UserContext);

  const onSubmit = async (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };

    await login(user).then((response) => {
      if (response.status === 200) {
        setUser(response.result);
        setToken(response.accessToken);
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("userId", response.result.id);
        navigate("/posts");
      } else {
        setLoginError(response);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Invalid email address"),
      password: Yup.string()
        .min(6, "Password should be greater than 6 digit")
        .required("Required"),
    }),

    onSubmit,
  });

  return (
    <Container className="container">
      <Paper className="paper">
        <div className="header">
          <h5>Create Account</h5>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <TextField
              className="input"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter email"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="error-msg">{formik.errors.email}</div>
            ) : null}

            <TextField
              className="input"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-msg">{formik.errors.password}</div>
            ) : null}

            <Button className="button" type="submit">
              Log in
            </Button>
            {loginError !== null ? (
              <div className="error-msg">{loginError}</div>
            ) : null}
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            If you have no account, Click here{" "}
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
