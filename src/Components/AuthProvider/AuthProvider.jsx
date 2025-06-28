import React, { createContext, useEffect, useState } from "react";
import app from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import Loading from "../Loading/Loading";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  // Loader
  const [loading, setLoading] = useState(false);
  // User Setup
  const [userDetails, setUserDetails] = useState(null);

  // User Loader All Time
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserDetails(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // PhonePass Register
  const registerNewAccount = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

//   PhonePass Login
const loginAccount = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
}




  //   Update Information
  const updateDetails = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

//   SignOut 
   const signOutUser = () => {
    setLoading(true);
     return signOut(auth);
   }
  //Data Passing
  const userInfo = {
    loading,
    setLoading,
    userDetails,
    updateDetails,
    registerNewAccount,
    loginAccount,
    signOutUser,
  };


  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
