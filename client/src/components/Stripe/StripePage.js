import React, { useEffect, useState } from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from "axios";
import { BeatLoader } from "react-spinners";
import {
    useLocation
  } from "react-router-dom";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IoEG4L1MA97pYvHkAXQ9r7wBejIZ0ZLcrXozHKsGZe56aMR7FfB0LVp6jXuiw0FgUZVjNn6IkL3AFiu4nnd79rh009nQr6Lxz');
const BaseURL = process.env.REACT_APP_API_URL;
function StripePage(props) {
  let location = useLocation();
   const amount=location.state.amount
   const returnUrl=location.state.returnUrl
     const currency="usd"
  
                                           
        
const [clientSecret,setClientSecret]=useState("")
    const getIntent=()=>{
        axios.post(`${BaseURL}/Payments/checkout`,{
            data:{amount:amount,currency:currency}
        })
        .then((res)=>{
            setClientSecret(res.data.client_secret)
        
        })
        .catch(err=>console.log(err))
    }
    useEffect(() => {
       getIntent()
    }, [])
 var options = {
    // passing the client secret obtained from the server
   
  };

  return (
   clientSecret? <Elements stripe={stripePromise} options={{clientSecret:clientSecret}} owner={location.state.owner} >
   <CheckoutForm returnUrl={location.state.returnUrl} owner={location.state.owner} />
 </Elements>:<div className="loading">
                    <BeatLoader color={"#8249A0"} size={20} />
                </div>
  );
};

export default StripePage;