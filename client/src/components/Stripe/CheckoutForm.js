import {ElementsConsumer, PaymentElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import React from 'react';
import { v4 as uuidv4 } from "uuid";
class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
    const {stripe,elements,returnUrl,storeDbData,owner} = this.props;
    const BaseURL = process.env.REACT_APP_API_URL;
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

  
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url:returnUrl,
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., payment details incomplete)
      console.log(result.error.message);
    } else {
     
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'1rem',padding:'1rem'}}> <form onSubmit={this.handleSubmit}>
        <PaymentElement />
        <button  
        className="d-grid col-12 btn-main login-form-button"
        variant="primary">Submit</button>
      </form></div>
     
    );
  }
}

export default function InjectedCheckoutForm(props) {

  return (
    <ElementsConsumer>
      {({stripe,elements,owner}) => (

        <CheckoutForm stripe={stripe} returnUrl={props.returnUrl} elements={elements} />
      )}
    </ElementsConsumer>
  )
}