import React from "react"
import { useAuth } from '../context/auth'
import Navbar from "../Components/Navbar";


function XHome() {
      // eslint-disable-next-line
    const [auth, setAuth]= useAuth();
  return (
    <>
        <Navbar  />

      <h1 className="font-lato text-2xl mt-44">This is Trial  Home Page!! </h1>  
      <pre>{JSON.stringify(auth, null, 4)}</pre>
       </>
  )
}

export default XHome
