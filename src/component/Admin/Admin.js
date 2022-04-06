import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RiImageAddLine } from "react-icons/ri";
import { BiUpload } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

import { toast } from "react-toastify";

import {
  MdVolunteerActivism,
  MdOutlineVolunteerActivism,
  MdOutlineCases,
} from "react-icons/md";

import Model from "react-modal";
import { AddCase, setCases } from "../../reducer/cases/index";
import { setUsers } from "../../reducer/users/index";
import { addImage } from "../../reducer/image/index";

import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { Link } from "react-router-dom";
import { setVolunteers } from "../../reducer/volunteer";

toast.configure();
const Admin = ({ searchCase }) => {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [case_image, setCase_Image] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [TheAmountRequired, setTheAmountRequired] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [message, setMessage] = useState("");
  const [imageselected, setImageSelected] = useState("");
  const [numUser, setNumUser] = useState(0);
  const [numCase, setNumCase] = useState(0);
  const [numVolunteer, setNumVolunteer] = useState(0);
  const [numPage, setNumPage] = useState(1);
  const [image_1, setImage_1] = useState("");
  const [imageIsOpen, setImageIsOpen] = useState(false);
  const [emergencyCase, setEmergencyCase] = useState("false");
  // ------------------------------------------------

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
  // ------------------------------------------------

  const getAllCases = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/admin/page?page=${numPage}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      if (!res.data.success) {
        setNumPage(numPage - 1);
      }
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      setMessage("no cases yet");
      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      cases: state.casesReducer.cases,
      token: state.loginReducer.token,
      images: state.imagesReducer.images,
      users: state.usersReducer.users,
      volunteers: state.volunteerReducer.volunteers,
    };
  });

  // ------------------------------------------------
  const addNewCase = () => {
    axios
      .post(
        "https://safe-houseforyou.herokuapp.com/cases",
        {
          category,
          case_image,
          title,
          case_description,
          TheAmountRequired,
          emergencyCase,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )

      .then((result) => {
        dispatch(
          AddCase({
            category,
            case_image,
            title,
            case_description,
            TheAmountRequired,
            emergencyCase,
          })
        );
        getAllCases();
        setMessage("the case has been created successfully");
        setModelIsOpen(false);
        navigate(`/admin`);

        // navigate(`/allcases`);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllCases();
  }, [numPage]);
  // ------------------------------------------------
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

  //  ----------------------------------------------
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
  // ------------------------------------------------
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
  //---------------------------------------------------
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

  // ------------------------------------------------

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "70%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const customStyles3 = {
    content: {
      //   background: "rgba(yellow, 0, 0, 0.7)",
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const conutCases = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/admin/countCase
`
      );

      if (res.data.success) {
        setNumCase(res.data.result[0].CountCase);
      }
    } catch (error) {}
  };
  useEffect(() => {
    conutCases();
  }, []);
  // ------------------------------------------------
  const countVolunteer = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/admin/countVolunteer
  `
      );

      if (res.data.success) {
        setNumVolunteer(res.data.result[0].CountVolunteer);
      }
    } catch (error) {}
  };
  useEffect(() => {
    countVolunteer();
  }, []);
  // ------------------------------------------------
  const conutUsers = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/admin/cuntUser
`
      );

      if (res.data.success) {
        setNumUser(res.data.result[0].CountUser);
      }
    } catch (error) {}
  };
  useEffect(() => {
    conutUsers();
  }, []);
  return (
    <div className="alll">
      {" "}
      <div className="links2">
        <ul>
          <li>
            {" "}
            <MdOutlineCases className="caseicon"></MdOutlineCases>{" "}
            <Link className="caselink" to="/admin/cases">
              Cases
            </Link>
          </li>
          <li>
            {" "}
            <FiUsers className="usericon"></FiUsers>
            <Link className="userlink" to="/admin/users">
              Users
            </Link>
          </li>
          <li>
            {" "}
            <MdOutlineVolunteerActivism className="volicon3"></MdOutlineVolunteerActivism>{" "}
            <Link className="voluntlink" to="/admin/volunteers">
              Volunteers
            </Link>
          </li>
          <RiImageAddLine className="imageIcon5"></RiImageAddLine>{" "}
          <p
            onClick={() => {
              setImageIsOpen(true);
            }}
            className="imageIcon4"
            title="Add Image"
          >
            {" "}
            Add Image
          </p>
        </ul>
      </div>
      <div className="allLinks">
        <div className="images3">
          <MdVolunteerActivism className="countVolunteer"></MdVolunteerActivism>
          <p className="countVolunteer2">{numVolunteer}</p>

          <p className="volunter">Volunteers</p>
          <p className="line2"></p>
        </div>
        <div className="images4">
          <FiUsers className="countUser"></FiUsers>
          <p className="countUserPrg">{numUser}</p>{" "}
          <p className="user2">Users</p>
          <p className="line"></p>
        </div>
        <div className="images5">
          <MdOutlineCases className="countCase"></MdOutlineCases>
          <p className="countCase2">{numCase}</p>
          <p className="case">Cases</p>
          <p className="line1"></p>
        </div>
      </div>
      <div className="model">
        <Model
          isOpen={modelIsOpen}
          style={customStyles}
          onRequestClose={() => setModelIsOpen(false)}
        >
          <div className="newPage">
            <br />
            <>
              <input
                className="category"
                type="text"
                placeholder="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></input>
              <br />
              <br />
              <input
                className="title"
                type="text"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>{" "}
              <br />
              <br />
              <input
                className="amount"
                type="number"
                placeholder="The amount required"
                onChange={(e) => {
                  setTheAmountRequired(e.target.value);
                }}
              ></input>
              <br />
              <br />
              <input
                type="file"
                className="image22"
                onChange={(e) => {
                  setImageSelected(e.target.files[0]);
                }}
              ></input>
              <button
                className="uplo"
                onClick={() => uploadImage(imageselected)}
              >
                {" "}
                <BiUpload className="uploadIcon"></BiUpload>
              </button>
              <br />
              <br />
              <textarea
                className="description"
                type="text"
                placeholder="  Description"
                onChange={(e) => {
                  setCase_Description(e.target.value);
                }}
              ></textarea>
              <br />
              <br />
              <button className="new" onClick={addNewCase}>
                New Case
              </button>
              <br />
              <br />
            </>

            {message}
          </div>
        </Model>
      </div>
      <div>
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
    </div>
  );
};
export default Admin;
