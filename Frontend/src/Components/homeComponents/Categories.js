import React from 'react'
import mens from '../../assets/images/Categories/mens.jpg'
import ladies from '../../assets/images/Categories/ladies.jpg'
import { Link, useNavigate } from 'react-router-dom'


function Categories() {
  const navigate= useNavigate();
  return (
    <>
      <div className='flex flex-col my-10 md:flex-row justify-center font-lato '>
        <div className='mx-auto'>
            <div><img src={mens} alt="" /></div>
            <div className='text-center py-9 sm:py-5'>
              <p>
                <p className='text-lg  text-gray-600 '>MENS WATCHES</p>
                <p className='underline  '><button onClick={()=>{navigate(`/category/men`)}}>Shop The Collection </button></p>
                </p>
            </div>
        </div>
        <div className='mx-auto'>
            <div><img src={ladies} alt="" /></div>
            <div className='text-center py-9  sm:py-5'>
            <Link to="/category/Women">
                <p className='text-lg  text-gray-600 '>LADIES WATCHES</p>
                <p className='underline  '><button  onClick={()=>{navigate(`/category/women`)}}>Shop The Collection </button></p>
                </Link>
            </div>
        </div>
      </div>
      
    </>
  )
}

export default Categories
