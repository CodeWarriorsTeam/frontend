import React, { useState } from "react";
import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import Navigation from "./component/NavBar/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./component/register/Register";
import AllCases from "./component/AllCases/AllCases";
import Login from "./component/login/Login";
import NewCase from "./component/NewCase/NewCase";
import NewDonation from "./component/NewDonation/NewDonation";
import KommunicateChat from "./component/chat";
import Home from "./component/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import Gallery from "./component/Gallery/Gallery";
import Admin from "./component/Admin/Admin";
import StripeContainer from "./component/StripeContainer";
import PaymentForm from "./component/PaymentForm";
import Users from "./component/UsersTable.js/Users";
import Volunteers from "./component/VolunteerTable/Volunteers";
import Cases from "./component/CaseTable.js/Cases";
function App() {
  const [searchCase, setSearchCase] = useState("");
  const [categoryNav, setCategory] = useState("");
  const [allCase, setAllCase] = useState("");
  const [num, setNum] = useState(1);
  const [numEducation, setNumEducation] = useState(0);
  const [numFood, setNumFood] = useState(0);
  const [numRebuilding, setNumRebuilding] = useState(0);
  const [numMedicalSupplies, setNumMedicalSupplies] = useState(0);

  const [inputEmergency1, setInputEmergency1] = useState(20);
  const [inputEmergency2, setInputEmergency2] = useState(23);

  const [isAdmin, setIsAdmin] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <>
      <Navigation
        setIsAdmin={setIsAdmin}
        isAdmin={isAdmin}
        setSearchCase={setSearchCase}
        setCategory={setCategory}
        setAllCase={setAllCase}
        userId={userId}
        setUserId={setUserId}
        setNum={setNum}
        numEducation={numEducation}
      />
      <KommunicateChat></KommunicateChat>
      <Routes>
        <Route path="/admin" element={<Admin searchCase={searchCase} />} />
        <Route
          path="/"
          element={
            <Home
              setCategory={setCategory}
              setAllCase={setAllCase}
              numEducation={numEducation}
              numFood={numFood}
              setNumFood={setNumFood}
              setNumEducation={setNumEducation}
              setNumRebuilding={setNumRebuilding}
              numRebuilding={numRebuilding}
              setNumMedicalSupplies={setNumMedicalSupplies}
              numMedicalSupplies={numMedicalSupplies}
              inputEmergency1={inputEmergency1}
            />
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route
          path="/allcases"
          element={
            <AllCases
              setNum={setNum}
              num={num}
              searchCase={searchCase}
              categoryNav={categoryNav}
              allCase={allCase}
              setNumEducation={setNumEducation}
              numEducation={numEducation}
              setNumFood={setNumFood}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsAdmin={setIsAdmin}
              isAdmin={isAdmin}
              setUserId={setUserId}
            />
          }
        />
        <Route
          path="/casedetails/:id"
          element={
            <NewDonation
              isAdmin={isAdmin}
              numFood={numFood}
              setNumFood={setNumFood}
              setNumRebuilding={setNumRebuilding}
              numRebuilding={numRebuilding}
              setNumEducation={setNumEducation}
              numEducation={numEducation}
              setNumMedicalSupplies={setNumMedicalSupplies}
              numMedicalSupplies={numMedicalSupplies}
            />
          }
        />

        <Route
          path="/admin/cases"
          element={
            isAdmin || localStorage.getItem("isAdmin") == "admin" ? (
              <Cases
                searchCase={searchCase}
                setInputEmergency1={setInputEmergency1}
                inputEmergency1={inputEmergency1}
                setInputEmergency2={setInputEmergency2}
                inputEmergency2={inputEmergency2}
              />
            ) : (
              <p>Not Authorized</p>
            )
          }
        />

        <Route
          path="/admin/users"
          element={<Users searchCase={searchCase} />}
        />

        <Route
          path="/admin/volunteers"
          element={<Volunteers searchCase={searchCase} />}
        />
      </Routes>
    </>
  );
}

export default App;
