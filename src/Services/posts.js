const axios = require("axios").default;
const token = localStorage.getItem("token");

export const getAllPosts = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_API}/post/show`,
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const createPost = async (post) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_API}/post/create`,
      data: {
        title: post.title,
        content: post.content,
        userId: post.userId,
      },
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deletePost = async (id, userId) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER_API}/post/${id}`,
      data: {
        userId: userId,
      },
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const editPost = async (post) => {
  try {
    const response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_API}/post/edit/${post.id}`,
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      data: {
        title: post.title,
        content: post.content,
        userId: post.userId,
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};
