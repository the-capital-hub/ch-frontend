import React, { useEffect, useState } from 'react'
import { getSubscriptionUrl, subscribe } from '../../Service/user'
import { useParams } from 'react-router-dom';
import Cashfree from "cashfree-pg";

const Subscription = () => {
    const [authLink,setAuthLink]=useState("")
    const {subReferenceId} = useParams
    useEffect(()=>{
        const getAuthLink = async()=>{
            try{
             const res= await  getSubscriptionUrl(subReferenceId)
              setAuthLink(res.data.authLink)
            }catch(err){
                throw err
            }
        }
     getAuthLink()
    },[])

    const handelSubscription = async ()=>{
       //await subscribe(authLink)
        // const checkoutOption={
        //   paymentSessionId:sessionId,
        //   returnUrl:`http://localhost:8080/`
        // }
        Cashfree.checkout(
            {
              token: authLink, // Pass the payment link from your backend
              onSuccess: (data) => {
                // Handle successful payment
              },
              onError: (error) => {
                // Handle payment error
              },
            },
            "cc" // Specify payment mode (cc for credit card)
          );
    }
  return (
    <div>Subscription</div>
  )
}

export default Subscription