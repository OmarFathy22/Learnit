import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase/config";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const provider = new GoogleAuthProvider();
const GoogleLogin = () => {
  const SignInWithGoogle = async () => {
    toast
      .promise(() => signInWithPopup(auth, provider), {
        pending: "Signing in with Google...",
        success: "Sign-in with Google successful",
        error: "Sign-in with Google failed",
      })
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        const SaveUserToDB = async () => {
          await setDoc(doc(db, "Users", user?.uid), {
            username: user?.displayName,
            photoUrl: user?.photoURL,
            email: user?.email,
            coursesInProgress: [],
            coursesCompleted: [],
            level: 0,
            points: 0,
            rank: 0,
          });
        };
        SaveUserToDB();
        setTimeout(() => {
          location.reload();
        }, 2000);
        localStorage.setItem("user", JSON.stringify(user));
        
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <div>
      <GoogleButton onClick={SignInWithGoogle} />
    </div>
  );
};

export default GoogleLogin;
