import React from 'react'

import { useAuth } from '../../context/auth';
import { Card } from 'flowbite-react';

import UserMenu from '../../Components/UserMenu';
import Navbar from '../../Components/Navbar';


function UserDashboard() {
    const [auth] = useAuth();

    return (
        <>

<Navbar />
      <section className='flex flex-row justify-center justify-items-center my-40 '>
        <div>
          <UserMenu active="dashboard" />
        </div>

        <div className="max-w-sm mx-auto my-10">
                    <Card>

                        <div className="flex flex-col items-center pb-10">
                            <image
                                className="mb-3 h-24 w-24 rounded-full shadow-lg"
                                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                alt="Bonnie image"
                            />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                {auth?.user?.name}
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {auth?.user?.email}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {auth?.user?.phone}
                            </span>

                        </div>
                    </Card>
                </div>


            </section>

        </>
    )
}

export default UserDashboard








