import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDonation } from "../../reducer/donation";
import "./NewDonation.css";
import Model from "react-modal";
import { FcDonate } from "react-icons/fc";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import { SiMinutemailer } from "react-icons/si";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import {
  setCases,
  updateCases,
  deleteCase,
  setCase,
} from "../../reducer/cases/index";
import { useNavigate } from "react-router-dom";
import StripeContainer from "../StripeContainer";
import PaymentForm from "../PaymentForm";

const NewDonation = ({
  isAdmin,
  numFood,
  setNumFood,
  setNumRebuilding,
  numRebuilding,
  setNumEducation,
  numEducation,
  setNumMedicalSupplies,
  numMedicalSupplies,
}) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
      caseById: state.casesReducer.caseById,
      donations: state.donationReducer.donations,
    };
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showItem, setShowItem] = useState(false);
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [donateIsOpen, setDonateIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [case_image, setCase_image] = useState("");
  const [title, setTitle] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [category, setCategory] = useState("");

  const [IBAN, setIBAN] = useState("");
  const [donations, setDonations] = useState("");
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState([]);
  const [isClosed, setIsClosed] = useState(true);
  const getbyid = async () => {
    try {
      const result = await axios.get(`https://safe-houseforyou.herokuapp.com/cases/${id}`);
      dispatch(setCase(result.data.result));

      setIsClosed(result.data.result[0].TheAmountRequired);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUpdateClick = (element) => {
    setUpdateBox(!updateBox);
    setCaseId(element.id);
    setCategory(element.category);
    setTitle(element.title);
    setCase_image(element.case_image);
    setCase_Description(element.case_description);
    if (updateBox) updateCaseById(element.id);
  };
  const updateCaseById = async (id) => {
    try {
      const result = await axios.put(`https://safe-houseforyou.herokuapp.com/cases/${id}`, {
        case_image,
        title,
        case_description,
        category,
      });
      dispatch(updateCases(result.data.results));

      getbyid();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCseById = async () => {
    try {
      await axios.delete(`https://safe-houseforyou.herokuapp.com/cases/${id}`);
      dispatch(deleteCase(id));
      getbyid();
      navigate(`/allcases`);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewDonation = () => {
    axios
      .put(
        `https://safe-houseforyou.herokuapp.com/cases`,
        { id, donations },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        dispatch(addDonation({ id, donations }));
        setMessage(" the donation has been created successfully");
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data.message);
      });
  };
  const customStyles2 = {
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

  // --------------
  const countNumFood = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/admin/cuntFood
 `
      );

      if (res.data.success) {
        setNumFood(res.data.result[0].countFood);
      }
    } catch (error) {}
  };
  ////------
  const countNumRebuilding = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/admin/cuntReb
 `
      );

      if (res.data.success) {
        setNumRebuilding(res.data.result[0].CountRebuilding);
      }
    } catch (error) {}
  };

  ///-------------
  const countNumEducation = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/admin/cuntEdu
 `
      );

      if (res.data.success) {
        setNumEducation(res.data.result[0].countEducation);
      }
    } catch (error) {}
  };
  ///--
  //-----
  const countNumMedSupplies = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/admin/cuntMedSupp
`
      );

      if (res.data.success) {
        setNumMedicalSupplies(res.data.result[0].CountMedSupplies);
      }
    } catch (error) {}
  };
  //--
  useEffect(() => {
    getbyid();
    countNumFood();
    countNumEducation();
    countNumRebuilding();
    countNumMedSupplies();
  }, []);
  return (
    <>
      <div className="wrapperCase">
        {state.caseById &&
          state.caseById.map((element, i) => (
            <>
              <img
                className="leftSide"
                src={element.case_image}
                alt="caseImage"
                width="100%"
              />

             

              <div className="rightSide">
                <div className="infoCase">
                  <h3>Case Details</h3>
                  <div className="case_data">
                    <div className="data">
                      <h4>Category</h4>
                      <p>{element.category}</p>
                    </div>
                    <div
                      className="data"
                      style={{
                        width: "80%",
                        wordBreak: "break-all",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <h4>Case</h4>
                      <p>{element.title}</p>
                    </div>
                    <div className="data">
                      <h4>Description</h4>
                      <div style={{ width: "200%", wordBreak: "break-all" }}>
                        {" "}
                        <p>{element.case_description}</p>
                      </div>
                    </div>
                    <div className="data">
                      <h4>Required</h4>
                      <p>{element.TheAmountRequired}$</p>
                    </div>
                  </div>
                </div>

                <div className="donateForCase">
                  <ul>
                    {isClosed && isClosed > 0 ? (
                      <>
                        {showItem ? (<>
                          <StripeContainer />
                          <li title="DonateNow">
                              <a
                                onClick={() => {
                                  setShowItem(true);
                                }}
                              >
                                <FcDonate></FcDonate>
                              </a>
                            </li>
                            <Link to="/gallery">
                          {" "}
                          <li
                            
                          >
                            {" "}
                            <a title="Gallery">
                              <GrGallery></GrGallery>
                            </a>
                          </li>
                        </Link></>
                        ) : (
                          <>
                            <li title="DonateNow">
                              <a
                                onClick={() => {
                                  setShowItem(true);
                                }}
                              >
                                <FcDonate></FcDonate>
                              </a>
                            </li>
                            <Link to="/gallery">
                          {" "}
                          <li
                            
                          >
                            {" "}
                            <a title="Gallery">
                              <GrGallery></GrGallery>
                            </a>
                          </li>
                        </Link>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <li
                          style={{
                            background:
                              "linear-gradient(to right ,#055302,#27d1189a) ",
                          }}
                        >
                          {" "}
                          <a title="Close case">
                            <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp>
                          </a>
                        </li>

                        <Link to="/gallery">
                          {" "}
                          <li
                            style={{
                              background:
                                "linear-gradient(to right ,#055302,#27d1189a) ",
                            }}
                          >
                            {" "}
                            <a title="Gallery">
                              <GrGallery></GrGallery>
                            </a>
                          </li>
                        </Link>
                      </>
                    )}
                  </ul>
                </div>
                <div className="infoCompany">
                  <div className="info_data">
                    <div className="data">
                      <p>
                        <span>
                          <SiMinutemailer></SiMinutemailer>{" "}
                        </span>{" "}
                        safeHouse@official.edj
                      </p>
                    </div>
                    <div className="data">
                      <p>
                        <span>
                          <BsFillTelephoneOutboundFill></BsFillTelephoneOutboundFill>
                        </span>{" "}
                        06-555555
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              
            </>
          ))}

        <>
         
        </>
      </div>
    </>
  );
};

export default NewDonation;
