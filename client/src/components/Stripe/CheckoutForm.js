import {ElementsConsumer, PaymentElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import React from 'react';
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, Zoom,toast } from 'react-toastify';
import xmgFintech from '../../assets/xmg-logo.png'
import { FaDollarSign, FaStripe } from 'react-icons/fa';
class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
    const {stripe,elements,returnUrl,storeDbData,owner,amount} = this.props;
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
      console.log(result.error);

     
      toast.error(result.error.code=="card_declined"?"card declined":result.error.message
      , {
          style: {
              border: "2px solid red",
              color: "red",
       
          },
          iconTheme: {
              primary: "red",
              secondary: "red",
          },
          position: "top-center",
      }
  );
    } else {
     
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  render() {
    return (
      <div   onDragStart={(e) => e.preventDefault()}
      onContextMenu={(event)=>{event.preventDefault ? event.preventDefault() : event.returnValue = false}}
       style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',margin:'1rem',padding:'1rem'}}>
       <div style={{padding:'1rem',borderRadius:'10px',boxShadow:'5px 5px 5px 5px #8149a09a'}}>
       <div> <FaStripe style={{fontSize:'120px',margin:'1rem',color:'#8249A0'}} />
        <img src={xmgFintech} width="150px" style={{margin:'1rem'}} />
        </div>
         <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'1rem',padding:'1rem'}}> 
         <form onSubmit={this.handleSubmit}>
        
        <PaymentElement />
        <p style={{fontSize:'0.93rem',color:'#767781',fontWeight:'400',marginTop:'1rem'}}>Amount: {this.props.amount/100} USD </p>
       
        <button  disable={!this.props.stripe}
        className="d-grid col-12 btn-main login-form-button"
        variant="primary" style={{marginTop:'1rem'}}>Submit</button>
      </form></div>
       </div>
       </div>
     
     
    );
  }
}

export default function InjectedCheckoutForm(props) {

  return (
    <ElementsConsumer>
      {({stripe,elements,owner}) => (

        <CheckoutForm stripe={stripe} returnUrl={props.returnUrl} amount={props.amount} elements={elements} />
      )}
    </ElementsConsumer>
  )
}