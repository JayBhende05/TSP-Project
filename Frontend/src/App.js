import React from "react"

// import XHome from "../src/Screen/XHome";
// import Home from "../src/Screen/Home";

import {   
  BrowserRouter as Router,
  Route,
  Routes } from "react-router-dom";
import About from "./Screen/About";
import PageNotFound from "./Screen/PageNotFound";
import Contact from "./Screen/Contact";
import Register from "./Screen/Auth/Register";

import {Toaster} from  "react-hot-toast"
import Login from "./Screen/Auth/Login";
import Dashboard from "./Screen/User/Dashboard";
import Profile from "./Screen/User/Profile";
import PrivateRoute from "./Components/Routes/Private";

import ForgotPassword from "./Screen/Auth/ForgotPassword";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Screen/Admin/AdminDashboard";
import CreateCategory from "./Screen/Admin/CreateCategory";
import CreateProduct from "./Screen/Admin/CreateProduct";
import AdminOrders from "./Screen/Admin/AdminOrders";
import Orders from "./Screen/User/Orders";
import Product from "./Screen/Admin/Product";
import UpdateProduct from "./Screen/Admin/UpdateProduct";
import ProductDetails from "./Screen/ProductDetails";
import CategoryProduct from "./Screen/CategoryProduct";
 import Home from "./Screen/Home";
//import XHome from "./Screen/XHome";
import AllWatches from "./Screen/AllWatches";
import CartPage from "./Screen/CartPage";

// import Navbar from "./Components/Navbar";





function App() {
 
    return (
     <>
     <Router>
        <Toaster/>
          {/* <Navbar/> */}
        <Routes>
          {/* <Route path="/" element={<XHome/>} /> */}
          <Route path="/" element={<Home/>} />
          <Route path="/product/:slug" element={<ProductDetails/>} />
          <Route path="/allwatches" element={<AllWatches/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/category/:slug" element={<CategoryProduct/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/login" element={<Login/>}/>

          {/* //Users Dashboard protected route */}
          <Route path="/dashboard" element={<PrivateRoute/>}>
            <Route path="user" element={<Dashboard/>}/>
            <Route path="user/profile" element={<Profile/>}/>
            <Route path="user/orders" element={<Orders/>}/>

          </Route>

          {/* //Admin dashboard route */}
          <Route path="/dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>}/>
            <Route path="admin/create-category" element={<CreateCategory/>}/>
            <Route path="admin/create-product" element={<CreateProduct/>}/>
            <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
            <Route path="admin/orders" element={<AdminOrders/>}/>
            <Route path="admin/get-product" element={<Product/>}/>

            
          </Route>
          <Route path="/*" element={<PageNotFound/>}/>
        </Routes>
        <Routes>

        </Routes>
        </Router>
     </>
    )
  }


export default App;



    
     
