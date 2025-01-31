import React from 'react'
import {  useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import { useState } from 'react'
import toast from 'react-hot-toast' 
import axios from 'axios'


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
 
    const navigate = useNavigate();
    //login function on submit
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
        const res = await axios.post('/api/v1/auth/forgot-password',{email,newpassword,answer});
        if(res && res.data.success){
            toast.success(res.data && res.data.message);//for notification
           
          navigate('/login');
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
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Reset Password
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                              
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                                </div>
                                <div>
                                    <label for="answer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Which is your Favorite Holiday Destination ? </label>
                                    <input type="answer" value={answer} onChange={(e)=> setAnswer(e.target.value)} name="address" id="address" placeholder="Enter your Answer" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input type="password" value={newpassword} onChange={(e)=> setNewPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                                <button type="submit" onClick={()=>{navigate('/login')}} className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-slate-700-700 dark:focus:ring-slate-800">Reset</button>                                
                               
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            </>
  );
}

export default ForgotPassword
