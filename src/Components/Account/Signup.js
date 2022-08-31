import { useState } from "react";
import { Button, Container, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../../StyleSheets/account-style.css";
import { signup } from "../../Services/accounts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const notify = () => {
    toast.success("Account Successfully created", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const onSubmit = async (values) => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    await signup(user)
      .then((response) => {
        if (response.status === 201) {
          notify();
          navigate("/");
        }
        if (response.status === 409) {
          setError(response.message);
        } else if (response.status === 422) {
          setError(response.error[0].msg);
        } else {
          setError(response);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //use Formik libraray
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name ")
        .required("Required")
        .max(25, "Must be 25 characters or less"),

      email: Yup.string().required("Required").email("Invalid email address"),

      password: Yup.string()
        .min(6, "password should be greater than 6 digit")
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
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter Name"
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="error-msg">{formik.errors.name}</div>
            ) : null}

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
              Sign Up
            </Button>
            {error !== null ? <div className="error-msg">{error}</div> : null}
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            Already have Account{" "}
            <span>
              <Link to="/">Log In</Link>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Signup;
