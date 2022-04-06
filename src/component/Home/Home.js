import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { addVolunteer } from "../../reducer/volunteer/index";
import Model from "react-modal";
import { MdVolunteerActivism } from "react-icons/md";
import { MdOutlineVolunteerActivism } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { BsInstagram } from "react-icons/bs";
import { AiFillLinkedin, AiOutlineArrowUp } from "react-icons/ai";
import { BsSnapchat } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  setCase,
  setCaseEmergency1,
  setCaseEmergency2,
} from "../../reducer/cases/index";

toast.configure();
const Home = ({
  setCategory,
  setAllCase,
  numEducation,
  numFood,
  setNumFood,
  setNumEducation,
  setNumRebuilding,
  numRebuilding,
  setNumMedicalSupplies,
  numMedicalSupplies,
  inputEmergency1,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      volunteers: state.volunteerReducer.volunteers,
      caseById: state.casesReducer.caseById,
      caseEmergency1: state.casesReducer.caseEmergency1,
      caseEmergency2: state.casesReducer.caseEmergency2,
    };
  });
  const [showScroll, setShowScroll] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [test, setTest] = useState(state.caseEmergency2);
  const [joinIsOpen, setJoinIsOpen] = useState(false);
  const getEmergency1CaseById = async () => {
    try {
      const result = await axios.get(
        `https://safe-houseforyou.herokuapp.com/cases/${localStorage.getItem("emergencyId1")}`
      );
      dispatch(setCaseEmergency1(result.data.result));
    } catch (error) {
      console.log(error.response);
    }
  };
  //------------------------
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  //------------------------
  const getAllCasesEmergency = async () => {
    try {
      const result = await axios.get(`https://safe-houseforyou.herokuapp.com/admin/emergency`);
      dispatch(setCaseEmergency2(result.data.result));
    } catch (error) {
      console.log(error.response);
    }
  };

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
  useEffect(() => {
    countNumEducation();
  }, []);
  useEffect(() => {
    countNumFood();
  }, []);
  useEffect(() => {
    countNumRebuilding();
  }, []);
  useEffect(() => {
    countNumMedSupplies();
  }, []);

  useEffect(() => {
    getAllCasesEmergency();
  }, []);

  //------------------------------------------------------------

  const addNewVolunteer = () => {
    axios
      .post(
        "https://safe-houseforyou.herokuapp.com/volunteer",
        { firstName, lastName, email, address_1, phonenumber },
        { headers: { Authorization: `Bearer ${state.token}` } }
      )

      .then((result) => {
        dispatch(
          addVolunteer({
            firstName,
            lastName,
            email,
            address_1,
            phonenumber,
          })
        );
        setJoinIsOpen(false);
        toast.success(
          `Thank you, ${firstName}, for your volunteering. We will contact you as soon as possible`,
          { autoClose: 10000, className: "notSuccess" }
        );
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.respone.data.message);
      });
  };

  const convertToCase = (id) => {
    navigate(`/casedetails/${id}`);
  };
  //--------------------------------

  const customStyles = {
    content: {
      top: "80%",
      left: "50%",
      right: "70%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -100%)",
    },
  };

  return (
    <>
      <header className="headerHome">
        <main className="main">
          <section className="whatDo">
            <h3 id="Welcome">Welcome To Safe House</h3>
            <h1 id="headerWhatDo">
              Donate for <span className="change_content"></span>
            </h1>
            <p id="prgWhatDo">
              {" "}
              If you do not have money, then smiling in the face of your brother
              is charity
            </p>
            <br />
            <br />

            <a href="/#ourTeam" id="Register">
              Our Team
            </a>

            <a href="/#sectionEmergence" id="Login">
              Emergency
            </a>
          </section>
        </main>
      </header>
      <section className="target" id="targetSection">
        <div className="containerTarget">
          <h2 className="headerTarget">safe house target for 2022</h2>
          <div className="boxContainer">
            <div className="box">
              <div className="cardImage"></div>
              <div className="targetTitle">Educating 1000 students</div>
              <div className="targetCount">
                Covered number for this moment:
                <span style={{ marginLeft: "5px" }}>{numEducation} </span>
              </div>
              <Link
                to="/allcases"
                onClick={() => {
                  setCategory(`education`);
                  setAllCase(false);
                }}
              >
                {" "}
                <button className="DonationNow">Donate Now</button>
              </Link>
            </div>

            <div className="box">
              <div className="cardImage"></div>
              <div className="targetTitle">Feeding 1000 poor</div>
              <div className="targetCount" style={{ marginTop: "28px" }}>
                Covered number for this moment:
                <span style={{ marginLeft: "5px" }}>{numFood}</span>
              </div>
              <Link
                to="/allcases"
                onClick={() => {
                  setCategory(`food`);
                  setAllCase(false);
                }}
              >
                {" "}
                <button className="DonationNow">Donate Now</button>
              </Link>
            </div>

            <div className="box">
              <div className="cardImage"></div>
              <div className="targetTitle">Repairing 500 facilities</div>
              <div className="targetCount">
                Covered number for this moment:
                <span style={{ marginLeft: "5px" }}>{numRebuilding} </span>
              </div>
              <Link
                to="/allcases"
                onClick={() => {
                  setCategory(`rebuilding`);
                  setAllCase(false);
                }}
              >
                {" "}
                <button className="DonationNow">Donate Now</button>
              </Link>
            </div>

            <div className="box">
              <div className="cardImage"></div>
              <div className="targetTitle">
                Medical Supplies for 1000 person
              </div>
              <div className="targetCount">
                Covered number for this moment:
                <span style={{ marginLeft: "5px" }}>{numMedicalSupplies} </span>
              </div>
              <Link
                to="/allcases"
                onClick={() => {
                  setCategory(`Medical Supplies`);
                  setAllCase(false);
                }}
              >
                {" "}
                <button className="DonationNow">Donate Now</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="sectionEmergence" id="sectionEmergence">
        <div className="titleEmergence">
          <h1>Emergency cases</h1>
          <div className="lineBen"></div>
        </div>

        <div className="rowEmergency">
          <></>

          {state.caseEmergency2 &&
            state.caseEmergency2.map((element, index) => (
              <>
                <div key={index} className="colEmergency">
                  <img src={element.case_image} />
                  <h4>{element.title}</h4>
                  <p>
                    Very urgent cases, help support them as soon as possible
                  </p>
                  <button
                    className="ctn"
                    onClick={() => {
                      convertToCase(element.id);
                    }}
                  >
                    Donate Now
                  </button>
                </div>
              </>
            ))}
        </div>
      </section>
      <div className="SectionVolunteering" id="volunteeringSection">
        <div className="containerVolunteering">
          <div className="volunteeringTitle">
            <h1>Volunteer with us</h1>
          </div>
          <div className="contentVolunteering">
            <div className="quotation">
              <h3>
                Be a volunteer to Make your presence in this life more beautiful
              </h3>
              <br />
              <p className="prgVolunteering">
                When you do any volunteer work, you will not know the meaning of
                boredom. Everything in the world of volunteering is an exciting
                and new experience in all respects that takes you to wide
                horizons.
              </p>
              <div className="btnVolunteering">
                <a
                  onClick={() => {
                    setJoinIsOpen(true);
                  }}
                >
                  JOIN US
                </a>
              </div>
            </div>
          </div>
          <div className="DivImageVolunteering">
            <img src="./image/vol1.jpg" />
          </div>
          <div className="iconVolunteering">
            <a>
              <MdVolunteerActivism></MdVolunteerActivism>{" "}
            </a>
            <a>
              <MdOutlineVolunteerActivism></MdOutlineVolunteerActivism>{" "}
            </a>
            <a>
              <FaHandHoldingHeart></FaHandHoldingHeart>{" "}
            </a>
          </div>
          <Model
            isOpen={joinIsOpen}
            style={customStyles}
            onRequestClose={() => {
              setJoinIsOpen(false);
            }}
          >
            <div className="vFormConatiner">
              <h2 className="headerV">Volunteering Form</h2>
              <br />
              <label for="FirstName" className="fullLabelV">
                {" "}
                Full Name<span className="span1"> *</span>
              </label>
              <br />
              <input
                className="firstNameV"
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></input>
              <input
                className="lastNameV"
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></input>
              <br /> <br />
              <label for="email" className="emailLabelV">
                {" "}
                Email<span className="span2"> *</span> <MdEmail></MdEmail>
              </label>
              <br />
              <input
                className="emailV"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              <br /> <br />
              <label for="address" className="addressLabelV">
                {" "}
                Address<span className="span3"> *</span>
              </label>
              <br />
              <input
                className="addressV"
                type="text"
                placeholder="Address"
                onChange={(e) => {
                  setAddress_1(e.target.value);
                }}
              ></input>
              <br /> <br />
              <label for="phonenumber" className="phoneNumberLabelV">
                {" "}
                Phone Number<span className="span4"> *</span>{" "}
                <ImPhone></ImPhone>
              </label>
              <br />
              <input
                className="phoneNumberV"
                type="text"
                placeholder="Phone Number"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              ></input>
              <br /> <br />
              <button onClick={addNewVolunteer} className="volunteerButton">
                Submit
              </button>
            </div>
          </Model>
          {message}
        </div>
      </div>
      <section className="about" id="about">
        <div className="contentAbout">
          <img src="./image/about.jpg" />
          <div className="contentText">
            <h1>About Us</h1>
            <br />
            <h5>Safe House Company</h5>
            <p>
              The safe house for charitable services, we seek to spread love and
              goodness among people and enhance human values among individuals,
              the company’s goal is to raise the banner of “goodness in my
              nation until the Day of Resurrection”, “people for people”
            </p>
          </div>
        </div>
      </section>

      <section className="ourTeam" id="ourTeam">
        <h1 className="headerTeam">OUR TEAM</h1>
        <div className="infoTeam">
          {/* Hamza */}
          <div className="member">
            <img src="./image/H.jpg" />
            <br></br>
            <h2 className="name">Hamza Shahrori</h2>
            <br></br>
            <p className="descriptionMember">
              A student at the wonderful Meraki Academy, and a full stack
              developer soon
            </p>
          </div>
          {/* Naamneh */}
          <div className="member">
            <img src="./image/N.jpg" />
            <br></br>
            <h2 className="name">Anas Naamneh</h2>
            <br></br>
            <p className="descriptionMember">
              A student at Meraki Academy, and a full stack developer soon
            </p>
          </div>
          {/* batool */}
          <div className="member">
            <img src="./image/b.jpg" />
            <br></br>
            <h2 className="name">Batool Abusneneh</h2>
            <br></br>
            <p className="descriptionMember2">
              A student at Meraki Academy
              <p> and a full stack developer</p>
            </p>
          </div>
        </div>
      </section>

      <AiOutlineArrowUp
        className="scrollTop"
        onClick={scrollTop}
        style={{ height: 50, display: showScroll ? "flex" : "none" }}
      ></AiOutlineArrowUp>

      <footer className="footer">
        <div className="footerContent">
          <h3 className="headerFooter">SAFE HOUSE</h3>
          <p className="titleFooter">
            Amman Gardens Street next to City Center Company
            <br />
            Contact Number 06-555555
            <br />
            Email safeHouse@official.edj
          </p>
          <ul className="socialsFooter">
            <li>
              <a>
                <GrFacebook className="icon"></GrFacebook>
              </a>
            </li>
            <li>
              <a>
                <BsInstagram className="icon"></BsInstagram>
              </a>
            </li>
            <li>
              <a>
                <AiFillLinkedin className="icon"></AiFillLinkedin>
              </a>
            </li>
            <li>
              <a>
                <BsSnapchat className="icon"></BsSnapchat>
              </a>
            </li>
            <li>
              <a>
                <FaTwitterSquare className="icon"></FaTwitterSquare>
              </a>
            </li>
          </ul>
        </div>

        <div className="footerBottom">
          <p>
            copyright &copy; 2022 Safe House ..Designed by{" "}
            <span>Code Warriors</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
