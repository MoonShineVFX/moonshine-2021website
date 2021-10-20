import React ,{useState,useContext }from "react";
import { Link, useHistory,Redirect } from "react-router-dom";
import {auth} from '../Config/fireauth'
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./Auth";

function Login() {
  const [user , setUser] = useState({})
  onAuthStateChanged(auth , (currentUser)=>{
    setUser(currentUser)
  })

  const handleLogin =  async event =>{
    event.preventDefault()
    const [ email , password] = event.target.elements
    console.log( email.value , password.value)
    try {
      await signInWithEmailAndPassword(auth, email.value , password.value)
      .then((userCredential) => {
        console.log(userCredential.user)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/admin" />;
  }
  return (
    <div className="login">
      <form className="login__container" onSubmit={handleLogin}>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input
          type="email"
          placeholder="E-mail Address"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="form-control"
        />
      </div>
        <button
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;