import React, { useEffect } from "react";
import {
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import GoogleButton from "react-google-button";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";






const provider = new GoogleAuthProvider();
const GoogleLogin = () => {

  const SignInWithGoogle = async (params) => {
    toast.promise(
      () => signInWithPopup(auth, provider),
      {
        pending: 'Signing in with Google...',
        success: 'Sign-in with Google successful',
        error: 'Sign-in with Google failed'
        
      }
    )
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          location.reload();
        }, 2000);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  
  };
  
  return (
    <div>
      <GoogleButton
        onClick={SignInWithGoogle}
      />
      
    </div>
  );
};

export default GoogleLogin;
