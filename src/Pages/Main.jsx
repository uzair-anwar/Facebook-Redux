import React, { useState, useEffect } from "react";
import "../StyleSheets/posts-style.css";
import Navbar from "../Components/Navebar";
import CreatePost from "../Components/Post/CreatePost";
import ShowPost from "../Components/Post/ShowPost";
import { getAllPosts } from "../Services/posts";
import Draft from "../Components/Draft/Draft";
import ReactPaginate from "react-paginate";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [draftPost, setDraftPost] = useState(
    JSON.parse(localStorage.getItem("draftPost"))
  );
  const [active, setActive] = useState("Posts");
  const tempUserId = useState(localStorage.getItem("userId"));
  const [userId] = useState(tempUserId[0]);

  const getData = async () => {
    getAllPosts().then((response) => {
      if (response.status === 200) {
        const data = response.result.reverse();
        const slice = data.slice(offset, offset + perPage);
        setPosts(slice);
        setPageCount(Math.ceil(data.length / perPage));
      }
    });
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 10 + 1);
  };

  useEffect(() => {
    getData();
  }, [active, offset, posts]);

  return (
    <>
      <Navbar setActive={setActive} />
      {active === "Posts" && (
        <>
          <CreatePost
            posts={posts}
            setPosts={setPosts}
            userId={userId}
            draftPost={draftPost}
            setDraftPost={setDraftPost}
          />
          <div className="posts-title">
            <h1>Posts</h1>
          </div>
          {posts.length > 0 ? (
            posts?.map((post) => (
              <div key={post.id}>
                <ShowPost
                  post={post}
                  posts={posts}
                  userId={userId}
                  setPosts={setPosts}
                />
              </div>
            ))
          ) : (
            <div className="empty-post">
              <p>There is no Post here</p>
            </div>
          )}
          <div className="pagination-section">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </>
      )}

      {active === "Draft" && (
        <Draft
          userId={userId}
          draftPost={draftPost}
          setDraftPost={setDraftPost}
        />
      )}
    </>
  );
};

export default Main;
