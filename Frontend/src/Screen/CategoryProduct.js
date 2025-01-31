import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

function CategoryProduct() {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    // eslint-disable-next-line
    const [category, setCategory] = useState([]);
  
    useEffect(() => {
      if (params?.slug) getPrductsByCat();
      // eslint-disable-next-line
    }, [params?.slug]);
    const getPrductsByCat = async () => {
      try {
        console.log(params.slug)
        const { data } = await axios.get(
          `/api/v1/product/product-category/${params.slug}`
        );
        setProducts(data?.products);
        setCategory(data?.category);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
        <Navbar/>
        <div classname=" w-1/2 mt-36 mx-auto mb-0  text-centre">
      <h1 className="font-simple text-3xl ">Category - {category.name} </h1> 
     <h1 className="">{products.length} items are listed   </h1>

        </div>
      <div>
                <div className="grid grid-flow-row grid-cols-4 my-28 ml-12 ">
                    {products ? products?.map((p) => (
                        <div className="p-5" >
                            
                                <div className="max-w-sm rounded overflow-hidden  shadow-lg ">
                                    <img className="w-full" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{p.name}</div>
                                        <p className="text-gray-700 text-base">
                                            {p.description.substring(0,40)}...
                                        </p>
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                               ${p.price}
                                            </span>
                                    </div>
                                    <div className="px-6  pb-2">
                                        <div className="flex items-center justify-between">
                                            <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Add to Cart
                                            </button>
                                            <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
    </div>
  )
}

export default CategoryProduct
