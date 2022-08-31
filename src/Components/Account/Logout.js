import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

function Logout(userID) {
  const navigate = useNavigate();
  const [userId] = useState(localStorage.getItem("userId"));
  const { setUser, setToken } = useContext(UserContext);

  const logOut = () => {
    localStorage.clear();
    setUser(null);
    setToken("");
    navigate("/");
  };

  return userId !== null ? (
    <div className="logout-section">
      <button className="logout" type="submit" onClick={() => logOut()}>
        Log Out
      </button>
    </div>
  ) : null;
}

export default Logout;
