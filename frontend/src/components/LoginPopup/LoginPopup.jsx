import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {

  const { setToken, url } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const onSubmitHandler = async (event) => {

    event.preventDefault();

    let endpoint = "";

    if (currState === "Login") {
      endpoint = "/api/user/login";
    } else {
      endpoint = "/api/user/register";
    }


    try {

      const response = await axios.post(
        url + endpoint,
        data
      );

      if (response.data.success) {

        // Save token in browser storage
        localStorage.setItem(
          "token",
          response.data.token
        );

        // Update App state immediately
        setToken(response.data.token);

        toast.success(
          response.data.message || "Login successful"
        );

        setShowLogin(false);

      } else {

        toast.error(response.data.message);

      }

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong");

    }

  };


  return (
    <div className="login-popup">

      <form
        className="login-popup-container"
        onSubmit={onSubmitHandler}
      >

        <div className="login-popup-title">

          <h2>{currState}</h2>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />

        </div>


        <div className="login-popup-inputs">

          {currState === "Login" ? null : (

            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />

          )}


          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />


          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />


        </div>


        <button type="submit">

          {currState === "Sign Up"
            ? "Create Account"
            : "Login"}

        </button>


        <div className="login-popup-condition">

          <input type="checkbox" required />

          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>

        </div>


        {
          currState === "Login" ? (

            <p>
              Create a new account{" "}
              <span onClick={() => setCurrState("Sign Up")}>
                Click Here
              </span>
            </p>

          ) : (

            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>
                Login Here
              </span>
            </p>

          )
        }


      </form>

    </div>
  );
};

export default LoginPopup;