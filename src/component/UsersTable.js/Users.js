import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUsers } from "../../reducer/users/index";
import { useEffect } from "react";
import { MdOutlineVolunteerActivism, MdOutlineCases } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import Model from "react-modal";
import { addImage } from "../../reducer/image/index";
import { RiImageAddLine } from "react-icons/ri";
import { BiUpload } from "react-icons/bi";

import "./users.css";
const Users = () => {
  const [case_image, setCase_Image] = useState("");
  const [message, setMessage] = useState("");
  const [image_1, setImage_1] = useState("");
  const [imageIsOpen, setImageIsOpen] = useState(false);
  const [imageselected, setImageSelected] = useState("");

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      users: state.usersReducer.users,
      cases: state.casesReducer.cases,
    };
  });
  //----------------------------------------------------------
  const getAllImage = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/gallery
   `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      if (res.data.success) {
        dispatch(setUsers(res.data.result));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllImage();
  }, []);
  //----------------------------------------------------------
  const addNewImage = () => {
    axios
      .post(
        "https://safe-houseforyou.herokuapp.com/gallery",
        { image_1 },
        { headers: { Authorization: `Bearer ${state.token}` } }
      )

      .then((result) => {
        dispatch(
          addImage({
            image_1,
          })
        );
        getAllImage();
        setImageIsOpen(false);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  //----------------------------------------------------------

  const customStyles3 = {
    content: {
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  //----------------------------------------------------------
  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "nfrmsteq");
    axios
      .post("https://api.cloudinary.com/v1_1/dxw4t7j0p/image/upload", formData)

      .then((result) => {
        setCase_Image(result.data.secure_url);
        setImage_1(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  //------------------------------------------------------------

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/user/all
         `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      if (res.data.success) {
        dispatch(setUsers(res.data.result));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="all">
      <br />
      <div className="links4">
        <Model
          style={customStyles3}
          isOpen={imageIsOpen}
          onRequestClose={() => setImageIsOpen(false)}
        >
          <input
            type="file"
            className="imaget"
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
            }}
          ></input>
          <button
            onClick={() => uploadImage(imageselected)}
            className="uploadImageButton"
          >
            {" "}
            <BiUpload className="uploadIcon"></BiUpload>
          </button>
          <button onClick={addNewImage} className="addImage">
            Add Image
          </button>
        </Model>
      </div>
      <div className="tables">
        <table className="table2">
          <>
            <ul>
              <RiImageAddLine className="imageIcon8"></RiImageAddLine>{" "}
              <p
                onClick={() => {
                  setImageIsOpen(true);
                }}
                className="imageLink8"
                title="Add Image"
              >
                {" "}
                Add Image
              </p>
              <MdOutlineCases className="casicon"></MdOutlineCases>{" "}
              <Link className="caselink3" to="/admin/cases">
                Cases
              </Link>
              <FiUsers className="usicon"></FiUsers>{" "}
              <Link className="userlink3" to="/admin/users">
                Users
              </Link>
              <MdOutlineVolunteerActivism className="volicon"></MdOutlineVolunteerActivism>
              <Link className="voluntlink3" to="/admin/volunteers">
                Volunteers
              </Link>
            </ul>
          </>
          <tr>
            <th className="id">id</th>
            <th className="img2">profile_image</th>
            <th className="first">firstName</th>
            <th className="last">lastName</th>
            <th className="co">country</th>
            <th className="em">email</th>
          </tr>
          {state.users &&
            state.users.map((element, i) => {
              return (
                <tr className="tttt">
                  <td className="id2">{element.id}</td>
                  <td className="imag2">{element.profile_image}</td>
                  <td className="first2">{element.firstName}</td>
                  <td className="last2">{element.lastName}</td>
                  <td className="cont2">{element.country}</td>
                  <td className="ema2">{element.email}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default Users;
