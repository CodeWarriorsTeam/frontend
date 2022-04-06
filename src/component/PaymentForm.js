import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import Model from "react-modal";
import axios from "axios";
import { setCase } from "../reducer/cases/index";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

toast.configure();
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Robato,Open Sans,Segoe UI,sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfb" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
const customStyles2 = {
  content: {
    top: "40%",
    left: "23%",
    right: "69%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-1%, -35%)",
  },
};

export default function PaymentForm() {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,

      caseById: state.casesReducer.caseById,
    };
  });
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(0);
  const { id } = useParams();
  const [title, seTitle] = useState([]);
  const [isClosed, setIsClosed] = useState(true);
  const [donateIsOpen, setDonateIsOpen] = useState(false);
  const getbyid = async () => {
    try {
      const result = await axios.get(`https://safe-houseforyou.herokuapp.com/cases/${id}`);
      seTitle(result.data.result[0].title);
      dispatch(setCase(result.data.result));

      setIsClosed(result.data.result[0].TheAmountRequired);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getbyid();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(`https://safe-houseforyou.herokuapp.com/payment`, {
          amount,
          id,
          title,
        });
        if (response.data.success) {
          setSuccess(true);
          toast.success(
            `Thank you for your donation of ${amount}$, the amount will be deducted from your bank account`,
            { autoClose: 10000, className: "notSuccess", position: "top-right" }
          );
        }

        getbyid();
      } catch (error) {
        toast.error(`opps!Please check the information entered`, {
          autoClose: 10000,
          className: "notError",
        });
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
      toast.error(`Opps!Please check the information entered`, {
        autoClose: 10000,
        className: "notError",
      });
    }
  };
  return (
    <>
      {!success ? (
        <Model
          style={customStyles2}
          isOpen={!donateIsOpen}
          onRequestClose={() => setDonateIsOpen(true)}
        >
          <form className="containerPayment" onSubmit={handleSubmit}>
            <h1>Confirm Donation </h1>
            <div className="divInfoName">
              <div className="Fname">
                <h3>First name</h3>
                <div className="input-filed">
                  <input placeholder="First Name...." type="text"></input>
                </div>
              </div>
              <div className="Lname">
                <h3>Last name</h3>
                <div className="input-filed">
                  <input placeholder="Last Name...." type="text"></input>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="divInfoCard">
              <div className="card-number">
                <h3>Card information</h3>
                <div className="inputs-filed">
                  <fieldset className="FormGroup">
                    <div className="FormRow">
                      <CardElement options={CARD_OPTIONS} />
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            <div className="how-match">
              <h3>How Much</h3>
              <div className="Selection">
                <div className="input-filed">
                  <input
                    type="text"
                    placeholder="How match...."
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="cardsImage">
                  <img src="../image/visa.png" />
                  <img src="../image/masterd.png" />
                  <img src="../image/payPal.png" />
                </div>
              </div>
            </div>

            <button
              className="APay"
              onClick={() => {
                getbyid();
              }}
            >
              Donate
            </button>
          </form>
        </Model>
      ) : (
        <></>
      )}
    </>
  );
}
