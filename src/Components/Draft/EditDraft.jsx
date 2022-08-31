import React, { useEffect } from "react";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const EditDraftPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let draftPost = null;
  let draftAllPosts = null;

  useEffect(() => {
    if (location.state == null) {
      navigate("*");
    }
  }, []);

  if (location.state !== null) {
    draftPost = location.state.draftPost;
    draftAllPosts = location.state.draftAllPosts;
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
      title: draftPost?.title,
      content: draftPost?.content,
    },

    onSubmit(values) {
      const index = draftAllPosts.findIndex((data) => data.id === draftPost.id);
      draftAllPosts[index].title = values.title;
      draftAllPosts[index].content = values.content;

      localStorage.removeItem("draftPost");
      localStorage.setItem("draftPost", JSON.stringify(draftAllPosts));
      notify("Drafted Post updated successfully");
      navigate("/posts");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="edit-form">
      <div className="form">
        <h2>Update your drafted post</h2>
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

export default EditDraftPost;
