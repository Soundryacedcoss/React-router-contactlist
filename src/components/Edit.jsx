import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { dataContext } from "../App";
export const Edit = () => {
  const name = useRef();
  const link = useRef();
  const profile = useRef();
  const type = useRef();
  const location = useLocation();
  const [msg, setMsg] = useState("");
  const data = useContext(dataContext);
  const [img, setImg] = useState("");
  useEffect(() => {
    if (location.state.from === "True") {
      name.current.value = "";
      link.current.value = "";
    } else {
      name.current.value = location.state.from.login;
      link.current.value = location.state.from.url;
    }
  }, [location.state.from]);
  const UploadFileHandler = (event) => {
    // upload abd display image
    let p1 = URL.createObjectURL(event.target.files[0]);
    setImg(p1);
  };
  const clickHandler = (e) => {
    if (name.current.value === "") {
      setMsg("Please write name");
    } else if (link.current.value === "") {
      setMsg("Please enter link");
    } else if (profile.current.value === "") {
      setMsg("Please choose profile image");
    } else {
      // creating new contact
      if (location.state.from === "True") {
        var obj = {
          login: name.current.value,
          url: link.current.value,
          avatar_url: img,
          type: type.current.value,
        };
        data.setData([...data.data, obj]);
        setMsg("Contact created successfully.");
      } else {
        // here editing contact detail
        data.data.forEach((element) => {
          if (element.id === e) {
            element.login = name.current.value;
            element.url = link.current.value;
            element.avatar_url = img;
          }
          data.setData([...data.data, element]);
          setMsg("Contact edited successfully.");
        });
      }
    }
  };
  return (
    <div className="contact">
      <div class="input-group mb-3">
        <span class="input-group-text w-25" id="basic-addon1">
          Name :
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="your userName"
          aria-label="Username"
          aria-describedby="basic-addon1"
          ref={name}
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text w-25" id="basic-addon1">
          Link :
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="git hub link"
          aria-label="Username"
          aria-describedby="basic-addon1"
          ref={link}
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="file"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          ref={profile}
          onChange={UploadFileHandler}
        />
      </div>
      {location.state.from === "True" ? (
        <div class="input-group mb-3">
          <span class="input-group-text w-25" id="basic-addon1">
            User Type
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="User type"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={type}
          />
        </div>
      ) : (
        ""
      )}
      <button
        className="btn btn-primary mt-4"
        onClick={() => clickHandler(location.state.from.id)}
      >
        {location.state.from === "True" ? "Create Contact" : " Save"}
      </button>
      {msg === "" ? (
        ""
      ) : (
        <div
          class="alert alert-warning alert-dismissible fade show mt-3"
          role="alert"
        >
          {msg}
          <button
            type="button"
            class="close btn "
            data-dismiss="alert"
            aria-label="Close"
            style={{ float: "right", fontSize: "20px" }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};
