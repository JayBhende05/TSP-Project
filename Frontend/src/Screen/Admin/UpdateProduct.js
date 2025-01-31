import React, { useState, useEffect } from 'react'
import { FiUpload } from "react-icons/fi"
import Navbar from '../../Components/Navbar'
import AdminMenu from '../../Components/AdminMenu'
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

function UpdateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  // eslint-disable-next-line
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate=useNavigate();
  const params=useParams();

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

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

   //Update product function
   const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
//delete a product
const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      // eslint-disable-next-line
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>

      <Navbar />
      <section className='flex flex-row justify-center justify-items-center my-40  '>
        <div>
          <AdminMenu active="none" />
        </div>

        <div className="min-w-sm w-1/2 mx-auto text-center">
          <h1 className='font-simple text-4xl underline my-10 text-center '>Update Product</h1>

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
            value={shipping?"Yes":"No"}
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
              value={category}
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
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ):( 
              <div className="text-center">
              <img
                src={`/api/v1/product/product-photo/${id}`}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>)}
            </div>

            {/* Create Button */}
            <div className="mt-10 mb-11">
                <button className="bg-white hover:bg-green-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="bg-white hover:bg-red-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-2" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>


          </div>
        </div>


      </section>



    </>
  )
}

export default UpdateProduct
