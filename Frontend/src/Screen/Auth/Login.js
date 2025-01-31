import React from 'react'
import {  useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import { useState } from 'react'
import toast from 'react-hot-toast' 
import axios from 'axios'
import { useAuth } from '../../context/auth'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth] = useAuth();
 
    const navigate = useNavigate();
    const location = useLocation();
    //login function on submit
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
        const res = await axios.post('/api/v1/auth/login',{email,password});
        if(res.data.success){
            toast.success(res.data && res.data.message);//for notification
            //to get the user data as respond and pass it to context API
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data))//saving th user data in user local storage to avoid loss of data on reload
          navigate(location.state ||'/');
        }else{
            toast.error(res.data.message);
        }
        
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
        
      }
    
    }

  return (
    <>
    <section className="bg-gray-50  dark:bg-gray-900 py-10">
        <Navbar bg="black" color="black"/>
                <div className="flex flex-col items-center justify-center my-10 px-6 py-12 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login 
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                              
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                                <button type="button" onClick={()=>{navigate('/forgot-password')}} className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-slate-700-700 dark:focus:ring-slate-800">Forgot Password</button>                                
                                <button type="submit" className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-slate-700-700 dark:focus:ring-slate-800">Log in</button>                                
                               
                            </form>
                        </div>
                    </div>
                </div>
            </section>
      
    </>
  )
}

export default Login
                             
                                
                               
