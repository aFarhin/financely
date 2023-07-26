import React, { useState } from "react";
import "./style.css";
import Input from "../input";
import Button from "../Button";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        setLoading(false);
        toast.success("User doc created to firebase");
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      // toast.error("Doc Already Exist");
      setLoading(false);
    }
  }

  function signUpWithEmail() {
    setLoading(true);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created Succesfully");
            setLoading(false);
            setConfirmPassword("");
            setPassword("");
            setName("");
            setEmail("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error(
          "Password and confirm password are not mached, try again!!"
        );
        setLoading(false);
      }
    } else {
      toast.error("All Fields are mandatory");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          toast.success("Logged in Successfully!!");
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory!!");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          console.log(token);
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User Authenticated");
        })
        .catch((error) => {
          setLoading(false);
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className= 'signup-wrapper'>
     <h2 className='title'>Login on <span className="blue-text">Financely.</span>
            </h2>
          <form action="">
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter Your E-mail"}
            />

            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter Your password"}
            />

            <Button
              disabled={loading}
              text={ loading ? "Loading..." : "Login using Email & Password"}
              onClick={loginUsingEmail}
            />
            <p style={{textAlign:"center", fontWeight:"600", fontSize:".7rem"}}>OR</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Login using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Or Don't have an account? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign up on <span style={{ color: "var(--theme" }}>Financely.</span>
          </h2>
          <form action="">
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Enter Your Name"}
            />

            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter Your E-mail"}
            />

            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter Your password"}
            />

            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Confirm Your Password"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email & Password"}
              onClick={signUpWithEmail}
            />
            <p className="p-login">OR</p>
            <Button 
              onClick={googleAuth}
              text={loading ? "Loading..." : "Signup using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Already have an account? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSigninComponent;
