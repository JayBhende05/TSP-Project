import Navbar from '../Components/Navbar'
import { useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

function ProductDetails() {
  const[cart,setCart] = useCart();
    const params = useParams();
    // const navigate = useNavigate();
    const [product, setProduct] = useState({});

  
    //initalp details
    useEffect(() => {
      if (params?.slug) getProduct();
      // eslint-disable-next-line
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
   
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
    <Navbar/>
    <div className='mb-10 mt-36'>
        <h1 className='lg:text-3xl text-xl underline font-semibold lg:leading-6 leading-7 text-center text-gray-800 mt-8 '>Product Details</h1>
   
    </div>
    <div>
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
            <img className="w-full" src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} />
            </div>
            <div className="md:hidden">
                <img className="w-full"  src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} />
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm leading-none text-gray-600"></p>
                    <h1 className=" lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2 ">
                        {product.name}
                    </h1>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">{product.description}</p>
                    
                </div>
                
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 ">${product.price}</p>
                    
                </div>
                
                <button  className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700" onClick={()=>{
                 setCart([...cart,product])
                toast.success("Product Succesfully Added to Cart")
                }}>
                   <AiOutlineShoppingCart/>  Add to cart
				
                </button>
                
            </div>
        </div>
   


    </div>
    
      
    </>
  )
}

export default ProductDetails

