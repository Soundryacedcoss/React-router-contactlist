import { Login } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { dataContext } from "../App";
export const Sidebar = () => {
  const data = useContext(dataContext);
  const [searchData, setSearchData] = useState([]);
  const [clone, setClone] = useState();
  const input = useRef();
  useEffect(() => {
    // Fetching data from api
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((val) => {
        if (data.data.length === 0) {
          data.setData(val);
          setClone(val);
        } else {
          data.setData([...data.data]);
        }
      });
  }, []);
  // searching data
  const InputHandler = () => {
    let temp = [];
    if (input.current.value.length >= 2) {
      for (let i = 0; i < data.data.length; i++) {
        let name = data.data[i].login.toLowerCase();
        if (name.startsWith(input.current.value)) {
          temp.push(data.data[i]);
          // setSearchData(temp);
          data.setData(temp);
        } else {
          temp.push();
          data.setData(temp);
        }
      }
    } else if (input.current.value === "") {
      setSearchData([]);
      data.setData(clone);
    }
  };
  return (
    <div>
      <div
        className="offcanvas offcanvas-start show"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search here..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={InputHandler}
              ref={input}
            />
            <Link to={"/Contact/Edit"} state={{ from: "True" }}>
              <Button variant="contained" className="mx-3">
                new
              </Button>
            </Link>
          </div>
        </div>
        <div className="offcanvas-body">
          {data.data.length === 0
            ? ""
            : data.data.map((val) => (
                <p key={val.id}>
                  <Link to="/Contact" state={{ from: val }}>
                    {val.login}
                  </Link>
                </p>
              ))}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
