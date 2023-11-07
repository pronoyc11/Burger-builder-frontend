import React, { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Loading from "../../../loader/Loading.js";
import { resetIngredient } from "../../../../redux/ActionCreator.js";
const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    token: state.token,
    userId: state.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredient: () => {
      dispatch(resetIngredient());
    },
  };
};
const Checkout = (props) => {
  /*Define states*/
  const [modalMsg, setModalMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [goback, setGoback] = useState(false);
  const [values, setValues] = useState({
    deliveryAdress: "",
    number: "",
    paymentType: "Pay Now",
  });
  const navigate = useNavigate();
  /*State defined above*/
  /*define functions*/
  const goBack = () => {
    setGoback(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.paymentType === "Cash on delivery") {
      setIsLoading(true);
      const orders = {
        ingredients: props.ingredients,
        price: props.totalPrice,
        customer: values,
        orderTime: new Date(),
        userId: props.userId,
        orderStatus:"Cash on delivery",
        payment:"Pending"
      };
      setValues({
        ...values,
        deliveryAdress: "",
        number: "",
        paymentType: "Cash on delivery",
      });
      let url = process.env.REACT_APP_BACKEND_URL;
      axios
        .post(`${url}/order/`, orders, {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            setIsLoading(false);
            setModalOpen(true);
            setModalMsg("Order placed successfully.");
            props.resetIngredient();
          } else {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setModalOpen(true);
          setModalMsg("Something went wrong," + err.message);
        });
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  /*functions defined above*/

  const form = (
    <div>
      <h4
        style={{
          border: "1px solid",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "1px 1px #8888",
        }}
      >
        Price:{props.totalPrice} BDT
      </h4>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          border: "1px solid",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "1px 1px #8888",
        }}
      >
        <textarea
          name="deliveryAdress"
          value={values.deliveryAdress}
          className="form-control"
          placeholder="Your delivery adress"
          required
          onChange={(e) => handleChange(e)}
        />
        <br></br>
        <input
          name="number"
          value={values.number}
          className="form-control"
          placeholder="Your phone number"
          required
          onChange={(e) => handleChange(e)}
        />

        <label className="mt-3 mb-2 ms-1 fw-bold">
          Select your payment method{" "}
        </label>
        <select
          value={values.paymentType}
          name="paymentType"
          className="form-control"
          onChange={(e) => handleChange(e)}
        >
          <option value="Pay Now">Pay now</option>
          <option value="Cash on delivery">Cash on delivery</option>
        </select>
        <br />
        {values.paymentType === "Pay Now" ? (
          <Link to="/payment" state={{orders : {
            ingredients: props.ingredients,
            price: props.totalPrice,
            customer: values,
            orderTime: new Date(),
            userId: props.userId,
            orderStatus:"Paid according to users",
            payment:"Pending"
          }}}>
            <Button
             type="button"
              disabled={!props.purchasable}
              className="mr-auto"
              style={{ backgroundColor: "#D70F64" }}
            >
              Order Now
            </Button>
          </Link>
        ) : (
          <Button
            disabled={!props.purchasable}
            className="mr-auto"
            style={{ backgroundColor: "#D70F64" }}
          >
            Order Now
          </Button>
        )}
        <Button onClick={() => goBack()} className="ms-1" color="secondary">
          Cancel
        </Button>
      </form>
    </div>
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {!isLoading && form}
      <Modal isOpen={modalOpen} onClick={() => goBack()}>
        <ModalBody>{modalMsg}</ModalBody>
      </Modal>

      {goback && <Navigate to="/" replace={true} />}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
