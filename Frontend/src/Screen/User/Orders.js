import React from 'react'
import Navbar from '../../Components/Navbar'
import UserMenu from '../../Components/UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from "moment"
import { Table } from 'flowbite-react';

function Orders() {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <>
      <Navbar />
      <section className='flex flex-row  my-40 '>
        <div>
          <UserMenu active="orders" />
        </div>

        <div className="max-w-sm  my-10">

          {orders?.map((o, i) => {
            return (
              <>
                <Table hoverable={true} className='mx-auto'>
                  <Table.Head>
                    <Table.HeadCell>Id</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Buyer</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Payment</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-bold text-gray-900 dark:text-white">{i + 1}</Table.Cell>
                      <Table.Cell>{o?.status}</Table.Cell>
                      <Table.Cell>{o?.buyer?.name}</Table.Cell>
                      <Table.Cell>{moment(o?.createdAt).fromNow()}</Table.Cell>
                      <Table.Cell>{o?.payment.success ? "Successs" : "Failed"}</Table.Cell>
                      <Table.Cell>{o?.products?.length}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <div>
                  <h1 className='font-simple text-4xl underline my-10 mx-11 '> All Product</h1>
                  <div className="grid grid-flow-row grid-cols-3 w-[275%] ml-12 ">
                    { o?.products?.map((p, i) => (
                      <div className="p-5" >

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

                      </div>

                    ))}
                  </div>
                </div>
              </>
            )
          })}




        </div>




      </section >

    </>
  )
}

export default Orders
