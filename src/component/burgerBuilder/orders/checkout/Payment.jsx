import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { initPayment } from "./paymentInit";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = state =>{
  return {
    token:state.token
  }
}

const Payment = (props) => {
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const location = useLocation();

  const { orders } = location.state ;
  
 
  useEffect(() => {

    initPayment(props.token)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
         orders.sessionKey = response.data.sessionkey ;
         orders.transanction_id = response.data.tran_id ;
          let url = process.env.REACT_APP_BACKEND_URL;
          axios
            .post(`${url}/order/`, orders, {
              headers: {
                Authorization: `Bearer ${props.token}`,
              },
            })
            .then((res) => {
              if (res.status === 201) {
  //gateway url
            setSessionSuccess(true);
          setRedirectUrl(response.data.GatewayPageURL);
          setFailed(false);
              } else {
               
              }
            })
            .catch((err) => {
   
            });

        }
      })
      .catch((err) => {
        setFailed(true);
        setSessionSuccess(false);
      });
  }, []);

  return (
    <div>
      {sessionSuccess
        ? window.location = redirectUrl
        : "Payment is processing"}
      {failed ? (
        <p>
          Failed to start payment session!<Link to="/">Go to home</Link>
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Payment);
