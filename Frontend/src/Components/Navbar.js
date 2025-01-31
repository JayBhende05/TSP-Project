import React, { useState } from 'react'
import {Dropdown} from 'flowbite-react'
import {HiViewGrid, HiLogout} from 'react-icons/hi'


import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/cart';
import { Badge } from 'antd';

const Navbar = (props) => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();

    let { bg, color } = props;

    let [open, setOpen] = useState("false");

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        });
        localStorage.removeItem("auth");
        toast.success("Logout Succesfully");
    }


    const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setColorchange(true);
        }
        else {
            setColorchange(false);
        }
    };
    window.addEventListener('scroll', changeNavbarColor);
    return (
        <div className={`shadow-md w-full fixed top-0 left-0 font-lato z-10  ${colorChange ? `{ bg-white text-black }` : `{ bg-${bg} text-${color} z-10`}}`}>
            <div className='sm:flex items-center justify-between py-2  sm:py-4 sm:px-5 px-3'>
                {/* Brand Logo  */}
                <Link to="/">
                    <div className='font-bold  cursor-pointer flex flex-col md:items-center'>
                        <p className='font-cinzel  text-sm  md:text-base mb-0  lg:text-4xl'>WristCrafters</p>
                        <p className='font-cinzel text-[5px] pl-3 mb-0 md:text-[10px] lg:text-sm'>Craftsmanship in Every Second</p>
                    </div>
                </Link>


                {/* Hamburger*/}
                <div onClick={() => setOpen(!open)} className='text-xl  absolute right-8 top-2 cursor-pointer sm:hidden'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                {/* List of Elements */}
                <ul className={`pb-2 absolute  bg-white z-[-1] left-[230px] sm:left-[400px] w-full pl-4 transition-all duration-500 ease-in ${open ? 'top-[45px]  ' : 'top-[-500px]'} sm:flex sm:items-center sm:pb-0 sm:static sm:bg-transparent  sm:z-auto  sm:mr-8 sm:w-auto sm:pl-0 `}>


                    <li key='allwatches' >
                        <Link to="/allwatches" className={` ${colorChange ? "text-white" : "text-black"}text-xs font-semibold  my-2 sm:text-[9px]  sm:ml-8 sm:my-0 md:text-xs lg:text-base hover:underline hover:font-bold hover:transition-all  duration-500`}  >LUXURY WATCHES</Link>
                    </li>

                    {
                        !auth.user ? (<>
                            <li key='REGISTER' >
                                <Link to="/register" className={` ${colorChange ? "text-white" : "text-black"}text-xs font-semibold  my-2 sm:text-[9px]  sm:ml-8 sm:my-0 md:text-xs lg:text-base hover:underline hover:font-bold hover:transition-all  duration-500`}  >REGISTER</Link>
                            </li>
                            <li key='LOGIN' >
                                <Link to="/login" className={` ${colorChange ? "text-white" : "text-black"}text-xs font-semibold  my-2 sm:text-[9px]  sm:ml-8 sm:my-0 md:text-xs lg:text-base hover:underline hover:font-bold hover:transition-all  duration-500`}  >LOGIN</Link>
                            </li>
                        </>) : (<>

                            <li className='flex flex-row'>

                             <label htmlFor="Dropdown" className={` ${colorChange ? "text-white" : "text-black"}text-xs font-semibold  my-2 sm:text-[9px]  sm:ml-8 sm:my-0 md:text-xs lg:text-base hover:underline hover:font-bold hover:transition-all  duration-500`} >{auth?.user?.name}</label> 

                            <Dropdown label=" " id="Dropdown" inline={true} className="" >
                                <Dropdown.Header>
                                   <Link>
                                    <span className="block text-sm">
                                        {auth?.user?.name}
                                    </span>
                                    </Link>
                                    <Link>
                                    <span className="block truncate text-sm font-medium">
                                    {auth?.user?.email}
                                    </span></Link>
                                </Dropdown.Header>
                                <Dropdown.Item  icon={HiViewGrid}>
                                   <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}> Dashboard</Link>
                                </Dropdown.Item>
                                {/* <Dropdown.Divider /> */}
                                <Dropdown.Item icon={HiLogout}>
                                <Link to={"/login"} onClick={handleLogout}> Logout</Link>
                                </Dropdown.Item>
                            </Dropdown>
                          </li>

                        </>)
                    }
                            <li key='Cart' >
                                <Badge  count={cart?.length} showZero>
                                <Link to="/cart"  className={` ${colorChange ? "text-black" : "text-white"} text-xs font-semibold  my-2 sm:text-[9px]  sm:ml-8 sm:my-0 md:text-xs lg:text-base hover:underline hover:font-bold hover:transition-all  duration-500`}> CART </Link>
                                </Badge>
                            </li>


                </ul>

            </div>
        </div>

    )
}

export default Navbar