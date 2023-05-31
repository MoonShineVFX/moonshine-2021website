import React ,{useState,useContext }from "react";
import { Navigate } from "react-router-dom";
import {auth} from '../firebaseConfig/fireauth'
import {  signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./Auth";

function Login() {
  const [user , setUser] = useState({})
  onAuthStateChanged(auth , (currentUser)=>{
    console.log(currentUser)
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
    return <Navigate to="/admin" />;
  }
  return (
    <div className="login bg-gradient-to-r from-cyan-500 to-blue-500 w-2/5 mx-auto p-4 rounded-md mt-10 ">
      <div className="text-gray-100 text-lg">Login 登入網站管理後台 
       <div className="text-gray-600 text-sm font-light">如果您並非網站管理者，請勿嘗試登入以免觸法。</div>
       </div>
      <form className="login__container" onSubmit={handleLogin}>
      <div className="mb-3 mt-3">
        <label htmlFor="exampleInputEmail1" className="form-label text-gray-100 ">Email address</label>
        <input
          type="email"
          placeholder="E-mail Address"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label text-gray-100 ">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
        />
      </div>
        <button
          className="py-2 px-4 bg-gray-100 text-black  rounded-md"
        >
          登入
        </button>
      </form>
    </div>
  );
}
export default Login;