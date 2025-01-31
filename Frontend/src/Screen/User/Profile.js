import React from 'react'
import Navbar from '../../Components/Navbar'
import UserMenu from '../../Components/UserMenu'

function Profile() {
  return (
    <>
    <Navbar />
    <section className='flex flex-row justify-center justify-items-center my-40 '>
        <div>
          <UserMenu active="profile" />
        </div>

        <div className="max-w-sm mx-auto my-10">
                   
                </div>


            </section>
      
    </>
  )
}

export default Profile
