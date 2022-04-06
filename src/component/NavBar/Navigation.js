import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducer/login";
import { useNavigate } from "react-router-dom";
import { MdSettingsPhone, MdSearch } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";

import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegRegistered } from "react-icons/fa";

import { BsFillHouseFill } from "react-icons/bs";
import "./Navigation.css";
import { IoLogoHackernews } from "react-icons/io";

import { BsSearch } from "react-icons/bs";
const Navigation = ({
  isAdmin,
  setSearchCase,
  setCategory,
  setAllCase,
  userId,
  setUserId,
  setIsAdmin,
  setNum,
  numEducation,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn };
  });

  const logout = () => {
    state.isLoggedIn = false;
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate(`/`);
    setUserId("");
    setIsAdmin(false);
  };

  return (
    <>
      {isAdmin ||
      (localStorage.getItem("isAdmin") == "admin" && state.isLoggedIn) ? (
        <>
          <nav className="nav">
            <br />
            <AiOutlineDashboard className="dashicon"></AiOutlineDashboard>{" "}
            <Link className="admin" to="/admin">
              Dashboard
            </Link>
            <input
              className="searchInputNav"
              id="searchInputNav"
              type="text"
              placeholder="Search here...."
              onChange={(e) => {
                setSearchCase(e.target.value);
              }}
            ></input>
            <RiLogoutBoxRLine className="logoutAdmin" onClick={logout}>
              Logout
            </RiLogoutBoxRLine>
            <br />
            <br />
          </nav>
        </>
      ) : (
        <>
          {" "}
          <nav className="nav">
            <Link className="safeHouseLink" to="/">
              {" "}
              <h2 className="titleLogo">
                <BsFillHouseFill className="iconHome"></BsFillHouseFill> SAFE
                HOUSE
              </h2>
            </Link>
            <input
              className="searchInputNav"
              id="searchInputNav"
              type="text"
              placeholder="Search here...."
              onChange={(e) => {
                setSearchCase(e.target.value);
              }}
            ></input>

            <ul className="ul">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <a href="/#about">About Us</a>
              </li>
              <li>
                <a>Contribute</a>
                <ul className="drop">
                  <li>
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setAllCase(true);
                        setCategory(false);
                        setNum(1);
                      }}
                    >
                      All Cases
                    </Link>
                  </li>

                  <li>
                    {" "}
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setCategory(`education`);
                        setAllCase(false);
                        setNum(1);
                      }}
                    >
                      Education
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setCategory(`food`);
                        setAllCase(false);
                        setNum(1);
                      }}
                    >
                      {" "}
                      Food
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setCategory(`Rebuilding`);
                        setAllCase(false);
                        setNum(1);
                      }}
                    >
                      {" "}
                      Rebuilding
                    </Link>{" "}
                  </li>
                  <li>
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setCategory(`Medical Supplies`);
                        setAllCase(false);
                        setNum(1);
                      }}
                    >
                      {" "}
                      Medical Supplies
                    </Link>{" "}
                  </li>
                </ul>
              </li>
              <li>
                <a href="/#volunteeringSection">Volunteer</a>
              </li>

              {state.isLoggedIn || userId ? (
                <li>
                  {" "}
                  <a id="Logout" onClick={logout}>
                    <RiLogoutBoxRLine className="iconLogout"></RiLogoutBoxRLine>{" "}
                  </a>
                </li>
              ) : (
                <>
                  <li>
                    {" "}
                    <Link className="login" to="/login" title="Login">
                      Login{" "}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};
export default Navigation;
