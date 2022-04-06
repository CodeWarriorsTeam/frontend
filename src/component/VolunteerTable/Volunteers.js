import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Model from "react-modal";
import { useEffect } from "react";
import { setVolunteers } from "../../reducer/volunteer";
import { Link } from "react-router-dom";
import { MdOutlineVolunteerActivism, MdOutlineCases } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { addImage } from "../../reducer/image/index";
import { RiImageAddLine } from "react-icons/ri";
import { BiUpload } from "react-icons/bi";
import { setUsers } from "../../reducer/users/index";

import "./volunteer.css";
const Volunteers = () => {
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
      volunteers: state.volunteerReducer.volunteers,
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

  const getAllVolunteers = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/volunteer
      `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      if (res.data.success) {
        dispatch(setVolunteers(res.data.result));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllVolunteers();
  }, []);

  return (
    <div className="all2">
      <div className="links5">
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
      <ul>
        <RiImageAddLine className="imageIcon9"></RiImageAddLine>{" "}
        <p
          onClick={() => {
            setImageIsOpen(true);
          }}
          className="imageLink9"
          title="Add Image"
        >
          {" "}
          Add Image
        </p>
        <MdOutlineCases className="casicon7"></MdOutlineCases>{" "}
        <Link className="caselink7" to="/admin/cases">
          {" "}
          Cases
        </Link>
        <FiUsers className="usicon7"></FiUsers>{" "}
        <Link className="userlink7" to="/admin/users">
          {" "}
          Users
        </Link>
        <MdOutlineVolunteerActivism className="volicon7"></MdOutlineVolunteerActivism>{" "}
        <Link className="voluntlink7" to="/admin/volunteers">
          {" "}
          Volunteers
        </Link>
      </ul>
      <table className="table1">
        <tr>
          <th className="id3">id</th>
          <th className="first3">firstName</th>
          <th className="last3">lastName</th>
          <th className="em3">email</th>
          <th className="addres3">address</th>
          <th className="phone3">phonenumber</th>
        </tr>
        {state.volunteers &&
          state.volunteers.map((element) => {
            return (
              <>
                <tr className="tt">
                  <td className="id4">{element.id}</td>
                  <td className="first4">{element.firstName}</td>
                  <td className="last4">{element.lastName}</td>
                  <td className="em4">{element.email}</td>
                  <td className="addres4">{element.address_1}</td>
                  <td className="phone4">{element.phonenumber}</td>
                </tr>{" "}
              </>
            );
          })}
      </table>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Volunteers;
