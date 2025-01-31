import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
function Spinner({path="login"}) {
    const [count, setCount] = useState(3)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate(`/${path}`,{
            state: location.pathname,
        });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);


    return (
        <>
            <section className='flex flex-col justify-around my-44 justify-items-center h-full'>

                <p className='text-center font-bold '> Redirecting to you in {count} seconds</p>
                <div className="inline-block  h-8 w-8  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>

            </section>

        </>
    )
}

export default Spinner
