import { useNavigate } from "react-router-dom";
import Logout from "./Account/Logout";

const Navbar = ({ setActive }) => {
  const navigate = useNavigate();
  const changePost = () => {
    setActive("Posts");
    navigate("/posts");
  };
  const changeDraft = () => {
    setActive("Draft");
    navigate("/drafts");
  };
  return (
    <>
      <div className="navbar">
        <div className="name-div">
          <h1>Facebook</h1>

          <div className="buttons nav-buttons">
            <button className="draft" type="submit" onClick={changePost}>
              Posts
            </button>
          </div>

          <div>
            <button className="draft" type="submit" onClick={changeDraft}>
              Draft
            </button>
          </div>

          <Logout />
        </div>
      </div>
    </>
  );
};

export default Navbar;
