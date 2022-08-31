import { NavLink } from "react-router-dom";
import "../../StyleSheets/posts-style.css";
import { toast } from "react-toastify";
import { createPost } from "../../Services/posts";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ShowDraft = ({ draftPost, draftAllPosts, userId, setDraftAllPosts }) => {
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

  const publish = async () => {
    const newPost = {
      title: draftPost.title,
      content: draftPost.content,
      userId: userId,
    };

    await createPost(newPost).then((response) => {
      if (response.status === 201) {
        const updatedPosts = draftAllPosts.filter(
          (post) => post.id !== draftPost.id
        );

        setDraftAllPosts(updatedPosts);
        localStorage.setItem("draftPost", JSON.stringify(updatedPosts));
        notify(response.message);
      } else if (response.status === 400) {
        notify(response.error[0].msg);
      }
    });
  };

  function removeDraftPost() {
    const updatedPosts = draftAllPosts.filter(
      (post) => post.id !== draftPost.id
    );

    setDraftAllPosts(updatedPosts);
    localStorage.setItem("draftPost", JSON.stringify(updatedPosts));
  }

  return (
    <div key={draftPost.id} className="post">
      <p>
        <i>{draftPost.title}</i>
      </p>

      <p className="content">{draftPost.content}</p>

      {draftPost.userId == userId ? (
        <div className="buttons">
          <button className="update-btn common-btn">
            <NavLink
              className="update-link"
              to={"/Draft/" + draftPost.id + "/edit"}
              state={{ draftPost: draftPost, draftAllPosts: draftAllPosts }}
            >
              {" "}
              UPDATE
            </NavLink>
          </button>

          <button
            className="delete-btn common-btn"
            onClick={() => removeDraftPost()}
          >
            DELETE
          </button>

          <button className="draft-btn common-btn" onClick={() => publish()}>
            PUBLISH
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ShowDraft;
