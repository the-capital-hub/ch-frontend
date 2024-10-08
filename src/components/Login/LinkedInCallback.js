// src/LinkedInCallback.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import { getLinkedInProfile, handelLinkdin } from '../../Service/user';


const LinkedIn = ({code})=>{

  useEffect(()=>{
    const fetchAccessToken = async () => {
      try {
        const response = await handelLinkdin(code)
        //console.log("Access token:", response.access_token);
        // Fetch LinkedIn profile data using the access token
        fetchUserProfile(response.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    fetchAccessToken();
  },[])
  const fetchUserProfile = async (accessToken) => {
    try {
      console.log(accessToken)
      const response = await getLinkedInProfile(accessToken)
      console.log("LinkedIn user profile:", response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  return (
    <></>
  )
}
const LinkedInCallback = () => {
  const location = useLocation();

  // Extract code from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get('code');
  if (code) {
    // Handle the received code in LinkedInLogin component
    return <LinkedIn code={code} />;
  }

  return (
    <div>
      <p>No authentication code found in URL</p>
    </div>
  );
};

export default LinkedInCallback;
