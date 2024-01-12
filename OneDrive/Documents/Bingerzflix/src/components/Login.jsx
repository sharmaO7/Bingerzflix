import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [signup, setSignup] = useState(true); //this means that the default is signup form
  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null); // useref hook is used to create a reference to the variable
  const password = useRef(null);

  const handleButtonClick = () => {
    //to validate the form on click of button
    // console.log(email);
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );

    seterrorMessage(message);
    if (message) return;

    //sign in sign up logic
    if (!signup) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              seterrorMessage(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  //creating a toggle form for signup, useState hook will also be used to change state
  const signupToggle = () => {
    setSignup(!signup); //  (!)used to toggle in case of true or false of value
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="Netflix logo"
        />
      </div>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="absolute w-3/12 p-12 bg-black text-white my-48 mx-auto right-0 left-0 bg-opacity-80"
      >
        <h1 className="font-bold text-2xl mx-14 p-4">
          {signup ? "Sign In" : "Sign Up"}
        </h1>
        {!signup && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name:"
            className="my-2 p-1 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address:"
          className="my-2 p-1 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password:"
          className="my-2 p-1 w-full bg-gray-700"
        />
        <p className="text-lg font-bold text-red-700 ">{errorMessage}</p>
        <button
          className="bg-red-700 p-4 my-4 rounded-lg w-full"
          onClick={handleButtonClick}
        >
          {signup ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={signupToggle} className="cursor-pointer">
          {" "}
          {signup
            ? "New to Bingerzflix? Sign up now!"
            : "Already Registered? Sign In now!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
