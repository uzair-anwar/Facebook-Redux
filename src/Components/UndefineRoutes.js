import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/404Page-style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const notify = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const UndefineRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    notify("There's nothing here: 404!");
  }, []);

  const back = () => {
    navigate("/posts");
  };

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page can't be found</h2>
        </div>
        <button className="common-btn delete-btn" onClick={() => back()}>
          Back
        </button>
      </div>
    </div>
  );
};

export default UndefineRoutes;
