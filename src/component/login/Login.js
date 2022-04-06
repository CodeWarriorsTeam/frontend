import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducer/login";
import "./Login.css";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
toast.configure();

const Login = ({ setIsAdmin, setUserId, isAdmin }) => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const responseGoogle = (response) => {
    state.token = response.tokenObj.id_token;
    console.log(response);
    setUserId(response.profileObj.googleId);
    console.log(response.profileObj.googleId);
    navigate("/");
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const userLogin = { email, pass };

  const login = () => {
    axios
      .post("https://safe-houseforyou.herokuapp.com/login", userLogin)

      .then(async (result) => {
        dispatch(loginUser(result.data.token));

        await setIsAdmin(
          result.data.result[0].role_name.toLowerCase() === "admin"
        );

        result.data.result[0].role_name === "admin"
          ? navigate("/admin")
          : navigate("/");

        localStorage.setItem("token", result.data.token);
        localStorage.setItem("isAdmin", result.data.result[0].role_name);
        toast.success(`Welcome`, { autoClose: 10000, className: "notSuccess" , position:"top-left" });
      })

      .catch((err) => {
        console.log(err.response.data);
        
        toast.error(err.response.data.message,{autoClose:10000,className:"notError",position:"top-left" })
      });
  };

  return (
    <>
      <div className="loginpage">
       
        <div className="left-login">
          <h1 className="sign">Login to Your Account</h1>
          <h3 className="signgoogle">Login using google</h3>
          <br />
          <GoogleLogin
            className="google"
            clientId="776623589420-erpi2vgpt6n8ncgv3gqc7ddcpphibjs5.apps.googleusercontent.com"
            buttonText="sign in with google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />{" "}
          <br />
          <p className="or">
            <span>OR</span>
          </p>
          <input
            type="text"
            className="emai"
            placeholder=" Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <br />
          <input
            type="password"
            placeholder=" Password"
            className="pass"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          ></input>
          <br />
          <button className="but" onClick={login}>
            Sign In
          </button>
          <br />
          <div className="message">{message}</div>
          <br />
         
        </div>
        <div className="right-login">
          {" "}
          <p className="newhere">New Here?</p>
          <p className="wordSign">
            sign up and discover a great amount loads of new cases
          </p>
          <button className="sent">
            <Link to="/register" className="link">
              Sign up
            </Link>
          </button>
         
        </div>
      </div>
    </>
  );
};
export default Login;
