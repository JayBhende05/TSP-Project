import React, { useState, useEffect } from "react";
import AdminMenu from '../../Components/AdminMenu';
import Navbar from '../../Components/Navbar';
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>

      <Navbar />
      <section className='flex flex-row  my-40 '>
        <div>
          <AdminMenu active="product" />
        </div>

        <div className="max-w-sm  my-10">
          <h1 className='font-simple text-4xl underline my-10 mx-11 '> All Product</h1>
          <div className="grid grid-flow-row grid-cols-3 w-[275%] ml-12 ">
            {products?.map((p) => (
              <div className="p-5" >
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link "
                >
                  <div className="max-w-sm rounded overflow-hidden   shadow-lg ">
                    <img className="w-full" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{p.name}</div>
                      <p className="text-gray-700 text-base">
                        {p.description}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">

                    </div>
                  </div>
                </Link>
              </div>

            ))}
          </div>
        </div>
      </section>

    </>
  )
}

export default Product






