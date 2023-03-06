import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { dataContext } from "../App";
export const Contact = () => {
  // Using uselocation hook for passing props via router link
  const location = useLocation();
  // using context data here
  const data = useContext(dataContext);
  const navigate = useNavigate();
  // delete functinality
  const DeleteHandler = (e) => {
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].id === e) {
        data.data.splice(i, 1);
        data.setData([...data.data]);
        navigate("/");
      }
    }
  };
  return (
    <div className="contact">
      <div className="contact__detail">
        <div>
          <img
            className="contact__userimg"
            src={location.state.from.avatar_url}
            alt=""
          />
        </div>
        <div className="contact__description">
          <h2>{location.state.from.login}</h2>
          <span>
            Github link:{" "}
            <a href={location.state.from.html_url}>{location.state.from.url}</a>{" "}
          </span>
          <p>User Type:{location.state.from.type}</p>
          <Link to="/Contact/Edit" state={{ from: location.state.from }}>
            <Button startIcon={<EditIcon />} variant="contained">
              Edit
            </Button>
          </Link>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            className="mx-3"
            onClick={(e) => DeleteHandler(location.state.from.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
