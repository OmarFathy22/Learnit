import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase/config";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
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
        const userData = {
          uid: user?.uid,
          username: user?.displayName,
          photoUrl: user?.photoURL,
          email: user?.email,
          completedCourses: 0,
          level: 0,
          points: 0,
          rank: 0,
        };
        const SaveUserToDB1 = async () => {
          await setDoc(doc(db, "Users", user?.uid), userData);
        };
        const SaveUserToDB2 = async () => {
          await setDoc(doc(db, "CoursesInProgress", user?.uid),{
            data: [],
            NumOfCompleted:0
          });
        };
        const checkuser = async (params) => {
          const docRef = doc(db, "Users", user?.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("welcome again🖐️");
          } else {
            SaveUserToDB1();
            SaveUserToDB2();
          }
        };
        checkuser();
        localStorage.setItem("user", JSON.stringify(userData));
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" self-center">
      <GoogleButton onClick={SignInWithGoogle} />
    </div>
  );
};

export default GoogleLogin;
