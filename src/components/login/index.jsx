import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";

import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwt-token");

  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />;
  }

  const inputname = (event) => {
    setUsername(event.target.value);
  };

  const inputPassword = (event) => {
    setPassword(event.target.value);
  };

  const submitedForm = async (event) => {
    event.preventDefault();
    const userDetails = {
      username,
      password,
    };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      setError(false);
      Cookies.set("jwt-token", data.jwt_token, { expires: 30 });
      navigate("/", { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="main-con">
      <div className="sub-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="app-logo"
        />
        <form type="form" onSubmit={submitedForm}>
          <div className="name-con">
            <label htmlFor="name">USERNAME</label>
            <br />
            <input
              type="text"
              id="name"
              placeholder="username"
              className="input-name"
              onChange={inputname}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="password"
              className="input-name"
              onChange={inputPassword}
              value={password}
            />
          </div>
          <button type="submit" className="button-login">
            Login
          </button>
        </form>
        <p className={`${error ? "error-occured" : "error-para"} `}>
          *Username and password didnot match
        </p>
      </div>
    </div>
  );
};

export default Login;
