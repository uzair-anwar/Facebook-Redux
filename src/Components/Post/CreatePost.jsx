import React, { useState } from "react";
import "../../StyleSheets/posts-style.css";
import "../../StyleSheets/404Page-style.css";
import { TextField } from "@material-ui/core";
import { createPost } from "../../Services/posts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const _ = require("lodash");
toast.configure();

const CreatePost = ({ posts, setPosts, userId, draftPost, setDraftPost }) => {
  const [titleError, setTitleError] = useState(null);
  const [contentError, setContentError] = useState(null);
  const [draftError, setDraftError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  const setError = () => {
    setDraftError(null);
    setTitleError(null);
    setContentError(null);
  };

  const clearField = (values) => {
    setTitle("");
    setContent("");
    setError();
  };

  //write logic here
  const stringValidationTitle = () => {
    if (!_.isEmpty(title)) {
      if (!isNaN(title)) {
        setTitleError("Only Numbers should not be in the Title of Post");
        return false;
      }
      return true;
    }
    return true;
  };

  const validationForField = () => {
    if (_.isEmpty(title)) {
      setTitleError("Required");
      return false;
    } else if (_.isEmpty(content)) {
      setContentError("Required");
      return false;
    } else if (_.size(content) < 20) {
      setContentError("Content should be greater then 20 character");
      return false;
    } else {
      return true;
    }
  };

  const creatDraftPost = (newPost) => {
    let updatedDraftPost = [];

    if (draftPost !== null) {
      updatedDraftPost = [...draftPost];
    }

    updatedDraftPost.push(newPost);
    setDraftPost(updatedDraftPost);
    localStorage.setItem("draftPost", JSON.stringify(updatedDraftPost));
    notify("Post save in draft successfully");
  };

  const draft = () => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    if (_.isEmpty(title) && _.isEmpty(content)) {
      setDraftError("Atleast One field has Content");
    } else if (stringValidationTitle()) {
      let id = _.uniqueId("0");
      const newPost = {
        id: id,
        title: title,
        content: content,
        userId: userId,
      };

      creatDraftPost(newPost);
      clearField();
    }
  };

  const submit = async () => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    if (validationForField() && stringValidationTitle()) {
      const newPost = {
        title: title,
        content: content,
        userId: userId,
      };

      await createPost(newPost).then((response) => {
        if (response.status === 201) {
          notify(response.message);
          setTitle("");
          setContent("");
        } else if (response.status === 400) {
          notify(response.message);
        }
      });

      const updatedPosts = [...posts];
      updatedPosts.push(newPost);
      setPosts(updatedPosts);
    }
  };

  return (
    <form className="edit-form">
      <div className="form">
        <h2>Create your post</h2>

        <TextField
          label="Title"
          variant="standard"
          className="title-input"
          id="title"
          name="title"
          type="text"
          placeholder="Enter Title"
          onClick={() => setError()}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="error-section">
          {titleError !== null ? (
            <div className="error-msg">{titleError}</div>
          ) : null}
        </div>

        <TextField
          label="Content"
          multiline
          maxRows={4}
          id="outlined-multiline-static"
          className="content-input"
          name="content"
          type="text"
          placeholder="Enter Content"
          onClick={() => setError()}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="error-section">
          {contentError !== null ? (
            <div className="error-msg">{contentError}</div>
          ) : null}
        </div>

        {draftError !== null ? (
          <div className="error-msg">{draftError}</div>
        ) : null}

        <div className="buttons">
          <div className="create-btn-section">
            <button
              onClick={submit}
              className="create-btn"
              variant="contained"
              type="submit"
            >
              Create
            </button>
          </div>
          <div className="create-btn-section">
            <button
              onClick={draft}
              className="create-btn"
              variant="contained"
              type="submit"
            >
              Draft
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
