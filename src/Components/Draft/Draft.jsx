import React from "react";
import ShowDraft from "./ShowDraft";

const Draft = ({ userId, draftPost, setDraftPost }) => {
  return draftPost.length > 0 ? (
    draftPost?.map((post) => (
      <div key={post.id}>
        <ShowDraft
          draftPost={post}
          draftAllPosts={draftPost}
          setDraftAllPosts={setDraftPost}
          userId={userId}
        />
      </div>
    ))
  ) : (
    <div className="empty-post">
      <p>There is no Drafted Post</p>
    </div>
  );
};

export default Draft;
