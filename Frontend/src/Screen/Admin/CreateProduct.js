import React, { useState, useEffect } from 'react'
import { FiUpload } from "react-icons/fi"
import Navbar from '../../Components/Navbar'
import AdminMenu from '../../Components/AdminMenu'
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  // eslint-disable-next-line
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate=useNavigate();

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

   //create product function
   const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/get-product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };


  return (
    <>

      <Navbar />
      <section className='flex flex-row justify-center justify-items-center my-40  '>
        <div>
          <AdminMenu active="create-product" />
        </div>

        <div className="min-w-sm w-1/2 mx-auto text-center">
          <h1 className='font-simple text-4xl underline my-10 text-center '>Create Product</h1>

          <div className="m-1 ">
            {/* Product name */}
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Enter Product Name"
                className=" rounded-lg w-2/3 border-none py-3 bg-slate-200 text-gray-700 text-sm font-bold mb-2"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

             {/* Product Description */}
             <div className="mb-3">
              <textarea
                type="text"
                
                value={description}
                placeholder="Enter Product Description"
                className=" rounded-lg w-2/3 border-none py-3 bg-slate-200 text-gray-700 text-sm font-bold mb-2"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
             {/* Product Price */}
             <div className="mb-3">
              <input
                type="number"
                
                value={price}
                placeholder="Enter Product Price"
                className=" rounded-lg w-2/3 border-none py-3 bg-slate-200 text-gray-700 text-sm font-bold mb-2"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Product Quantity */}
            <div className="mb-3">
              <input
                type="number"
                
                value={quantity}
                placeholder="Enter Product Quantity"
                className=" rounded-lg w-2/3 border-none py-3 bg-slate-200 text-gray-700 text-sm font-bold mb-2"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Product Shipping */}
            <div className="mb-3">
            <Select
              bordered={false}
              placeholder="Select Shipping"
              size="large"
              showSearch
              className="hover:scale-110 border-none bg-slate-200 rounded-lg w-2/3 mb-3"
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            </div>
          
          {/* Category Selection */}
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="hover:scale-110 border-none bg-slate-200 rounded-lg w-2/3 mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="bg-slate-200 hover:scale-105  text-gray-800 font-bold py-2 px-4 rounded inline-flex ">
                {photo ? photo.name : (<><FiUpload /><span className='mx-1'>Upload Photo</span> </>)}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            {/* Displaying Image   */}
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            {/* Create Button */}
            <div className="mb-3 mt-5">
                <button className="bg-white hover:bg-green-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>


          </div>
        </div>


      </section>



    </>
  )
}

export default CreateProduct
