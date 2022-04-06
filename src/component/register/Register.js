import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiUpload } from "react-icons/bi";
import { toast } from "react-toastify";
toast.configure();
const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [profile_image, setProfile_image] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [imageselected, setImageSelected] = useState("");
  const [role_id, setRole_id] = useState(2);

  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "nfrmsteq");
    axios
      .post("https://api.cloudinary.com/v1_1/dxw4t7j0p/image/upload", formData)

      .then((result) => {
        setProfile_image(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const checkFormValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,8}(.[a-z{3,8}])?/g;

    if (
      regEx.test(email) &&
      email !== null &&
      pass !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      country !== ""
    ) {
      register();
    }
  };

  const register = () => {
    axios
      .post(`https://safe-houseforyou.herokuapp.com/user`, {
        firstName,
        lastName,
        country,
        profile_image,
        email,
        pass,
        role_id,
      })
      .then((result) => {
        toast.success(
          `Thank you, ${firstName}, for joining the Safe Home family`,
          { autoClose: 10000, className: "notSuccess", position: "top-left" }
        );
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          autoClose: 10000,
          className: "notError",
        });
      });
  };
  return (
    <>
      <div className="registerPage">
        <div className="left-register">
          {" "}
          <p className="welcome">Welcome Back!</p>
          <p className="word"> To keep connected with us please</p>
          <p className="word2">login with your personal info</p>
          <button className="sent1">
            <Link  to="/login" className="link">
              SIGN IN
            </Link>
          </button>
        </div>
        <div className="right-register">
          <h1 className="signup">Create Account</h1>

          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder=" First Name"
            className="firstName"
          ></input>
          <br />
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder=" Last Name"
            className="lastName"
          ></input>
          <br />
          <input
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            type="text"
            placeholder=" Country"
            className="country"
          ></input>

          <br />
          <input
            type="file"
            className="image"
            style={{ width: "23%" }}
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
            }}
          ></input>
          <button
            onClick={() => uploadImage(imageselected)}
            className="uploadButton"
          >
            <BiUpload></BiUpload>
          </button>
          <br />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder=" Email"
            className="email"
          ></input>
          <br />
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            placeholder=" Password"
            className="password"
          ></input>
          <br />
          <button onClick={checkFormValidation} className="registerButton">
            SIGN UP
          </button>

          <br />
          <p className="message">{paragraph}</p>
        </div>
      </div>
    </>
  );
};

export default Register;
