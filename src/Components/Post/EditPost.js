import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { editPost } from "../../Services/posts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let post = null;
  let allPosts = null;

  /*Condition will check user send their state(Post or allPosts)
  to component or not. if not then navigate to the Error page*/
  useEffect(() => {
    if (location.state === null) {
      navigate("*");
    }
  }, []);

  if (location.state !== null) {
    post = location.state.post;
    allPosts = location.state.posts;
  }

  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const formik = useFormik({
    initialValues: {
      title: post?.title,
      content: post?.content,
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      content: Yup.string()
        .required("Required")
        .min(20, "Content should be greater then 20 character"),
    }),

    onSubmit(values) {
      const newPost = {
        id: post.id,
        title: values.title,
        content: values.content,
        userId: post.userId,
      };

      editPost(newPost).then((response) => {
        if (response.status == 200) {
          const index = allPosts.findIndex((data) => data.id === post.id);
          allPosts[index].title = values.title;
          allPosts[index].body = values.content;
          notify(response.message);
          navigate("/posts");
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="edit-form">
      <div className="form">
        <h2>Update your post</h2>
        <TextField
          label="Title"
          variant="standard"
          className="title-input"
          id="title"
          name="title"
          type="text"
          placeholder="Enter Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.title && formik.errors.title ? (
          <div className="error-msg">{formik.errors.title}</div>
        ) : null}

        <TextField
          label="Content"
          multiline
          maxRows={5}
          id="outlined-multiline-static"
          className="content-input"
          name="content"
          type="text"
          placeholder="Enter Content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.content && formik.errors.content ? (
          <div className="error-msg">{formik.errors.content}</div>
        ) : null}

        <button
          className="update-btn common-btn"
          variant="contained"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditPost;
