import React, { useState, useEffect } from "react";

import Navbar from "../Components/Navbar";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
  //eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 95;
      // eslint-disable-next-line
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //subtotal price
  const subTotalPrice = () => {
    try {
      let subTotal = 0;
      // eslint-disable-next-line
      cart?.map((item) => {
        subTotal = subTotal + item.price;
      });
      return subTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      // eslint-disable-next-line
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-56"></div>

      <div className="w-full h-full  overflow-x-hidden  ">
        <div className="w-full   h-full">
          <div className="flex md:flex-row justify-around flex-col ">
            <div className="lg:w-1/2  w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen">
              <p className="text-5xl font-black leading-10 text-gray-800 pt-3">{`Hello ${
                auth?.token && auth?.user?.name
              }`}</p>
              <p className="text-base font-black leading-none text-gray-800">
                {cart?.length
                  ? `You Have ${cart.length} items in your Cart ${
                      auth?.token ? "" : "Please login to checkout"
                    }`
                  : "Your Cart is Empty"}
              </p>
              {cart?.map((p) => (
                <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                  <div className="w-1/4">
                    <img
                      className="w-full h-full object-center object-cover"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />

                   
                  </div>
                  <div className="md:pl-3 md:w-3/4">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                      {p.slug}
                    </p>
                    <div className="flex items-center justify-between w-full pt-1">
                      <p className="text-base font-black leading-none text-gray-800">
                        {p.name}
                      </p>
                      <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                      </select>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 pt-2">
                      {p.description.substring(0, 30)}
                    </p>

                    <div className="flex items-center justify-between pt-5 pr-6">
                      <div className="flex itemms-center">
                        <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                          Add to favorites
                        </p>
                        <p
                          className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </p>
                      </div>
                      <p className="text-base font-black leading-none text-gray-800">
                        ${p.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-1/2">
              <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                <div>
                  <p className="text-4xl font-black leading-9 text-gray-800">
                    Summary
                  </p>
                  <div className="flex items-center justify-between pt-16">
                    <p className="text-base leading-none text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-none text-gray-800">
                      {subTotalPrice()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-none text-gray-800">$30</p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">Tax</p>
                    <p className="text-base leading-none text-gray-800">$35</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center pb-3 justify-between lg:pt-5 pt-14">
                    <p className="text-2xl leading-normal text-gray-800">
                      Total
                    </p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                      {totalPrice()}
                    </p>
                  </div>
                  <div>
                    {auth?.user?.address ? (
                      <>
                        <div className="flex items-center pb-3 justify-between lg:pt-5 pt-14">
                          <p className="text-xl leading-normal text-gray-800">
                            Current Address
                          </p>
                          <p className="text-base font-bold leading-normal text-right text-gray-800">
                            {auth?.user?.address}
                          </p>
                        </div>
                      </>
                    ) : (
                      <button
                        className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please Login to Checkout
                      </button>
                    )}
                  </div>
                  
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                      disabled={!instance || !auth?.user?.address}
                      onClick={handlePayment}
                    >
                      Make Payments
                    </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default CartPage;
