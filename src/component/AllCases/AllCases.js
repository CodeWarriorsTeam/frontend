import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCases } from "../../reducer/cases/index";
import { useNavigate } from "react-router-dom";
import "./AllCases.css";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";

const AllCases = ({
  searchCase,
  categoryNav,
  allCase,
  isAdmin,
  setNum,
  num,
  setNumEducation,
  numEducation,
  setNumFood,
}) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
    };
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const [category, setCategory] = useState("");

  const [case_image, setCase_image] = useState("");
  const [title, setTitle] = useState("");
  const [case_description, setCase_Description] = useState("");

  const [message, setMessage] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [userId, setUserId] = useState("");
  const [length, setLength] = useState("");

  const getAllCases = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/cases/page?page=${num}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      setLength(res.data.result.length);

      if (!res.data.result) {
        if (num == 0) {
          setNum(num + 1);
        } else {
          setNum(num - 1);
        }
      }
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      if (num == 0) {
        setNum(num + 1);
      } else {
        setNum(num - 1);
      }

      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  const convertToCase = (id) => {
    navigate(`/casedetails/${id}`);
  };

  const getAllCasesByCategory = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/cases/page/category?page=${num}&category=${categoryNav}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      if (!res.data.result) {
        if (num == 0) {
          setNum(num + 1);
        } else {
          setNum(num - 1);
        }
      }
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      if (num == 0) {
        setNum(num + 1);
      } else {
        setNum(num - 1);
      }

      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (categoryNav) {
      getAllCasesByCategory();
    }
  }, [categoryNav, num]);

  useEffect(() => {
    if (allCase) {
      getAllCases();
    }
  }, [allCase, num]);
  return (
    <>
      <br />
      <br />
      <br />
      <section className="allCasesSection">
        {state.cases &&
          state.cases
            .filter((caseInformation) => {
         
              if (searchCase == "") {
                return caseInformation;
              } else if (
                caseInformation.category
                  .toLowerCase()
                  .includes(searchCase.toLowerCase()) ||
                caseInformation.title
                  .toLowerCase()
                  .includes(searchCase.toLowerCase()) ||
                caseInformation.id.toString().includes(searchCase)
              ) {
                return caseInformation;
              }
            })
            .map((element, i) => (
              <>
             
                <div key={i} className="cardCases">
                  <img
                    className="cardImage"
                    src={element.case_image}
                    onClick={() => {
                      convertToCase(element.id);
                    }}
                  ></img>
                  <div className="cardText">
                    <p style={{ width: "100%"}}>
                      {element.title}
                    </p>
                    <span className="dataSpan">{element.category}</span>
                  </div>
                  <div className="cardState">
                    <div className="stat">
                      <div className="value">{element.id}</div>
                      <div className="type">Case</div>
                    </div>
                    <div className="stat border">
                      <div className="value">{element.TheAmountRequired}$</div>
                      <div className="type">required</div>
                    </div>
                    <div className="stat">
                      {element.TheAmountRequired &&
                      element.TheAmountRequired > 0 ? (
                        <div className="value" style={{ color: "green" }}>
                          Open{" "}
                        </div>
                      ) : (
                        <div className="value" style={{ color: "red" }}>
                          close
                        </div>
                      )}

                      <div className="type">State</div>
                    </div>
                  </div>
                </div>
              </>
            ))}
      </section>

      <div className="divPagination">
        {" "}
        {num == 1 ? (
          <></>
        ) : (
          <a
            onClick={() => {
              setNum(num - 1);
            }}
            className="backPaginationButton"
          >
           <span>BACK</span>
          </a>
        )}
        {state.cases && state.cases.length == 8 ? (
          <a
            className="PaginationButton"
            onClick={() => {
              setNum(num + 1);
            }}
          >
           <span>NEXT</span>
          </a>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AllCases;
