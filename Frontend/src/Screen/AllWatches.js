
import React, { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useCart } from "../context/cart";


function AllWatches() {
    const [products, setProducts] = useState([]);
    const navigate= useNavigate();
    const[cart,setCart] = useCart();

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };
    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <>
            <Navbar />
            <div className='mt-56 mb-10 text-center'>
                <h1 className="font-simple font-semibold text-4xl">Find your Best Luxuary Watch</h1>

            </div>
            <div>
                <div className="grid grid-flow-row grid-cols-4  ml-12 ">
                    {products ? products?.map((p) => (
                        <div className="p-5" >
                            
                                <div className="max-w-sm rounded overflow-hidden  shadow-lg ">
                                    <img className="w-full" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{p.name.substring(0,20)}...</div>
                                        <p className="text-gray-700 text-base">
                                            {p.description.substring(0,40)}...
                                        </p>
                                        {/* ₹ */}
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">

                                               ${p.price}
                                            </span>
                                    </div>
                                    <div className="px-6  pb-2">
                                        <div className="flex items-center justify-between">
                                            <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{
                                                setCart([...cart,p])
                                                toast.success("Product Succesfully Added to Cart")
                                            }}>
                                                Add to Cart
                                            </button>
                                            <button to="" className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                             onClick={()=>{navigate(`/product/${p.slug}`)}}>
                                                More Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                           
                        </div>

                    )) : "Loading"}
                </div>

            </div>
            


        </>
    )
}

export default AllWatches
