import Navbar from '../../Components/Navbar'
import AdminMenu from '../../Components/AdminMenu'
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import {Table} from "flowbite-react";
const { Option } = Select;

function AdminOrders() {
  // eslint-disable-next-line
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);

 // const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();

  const getOrders = async () => { 
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      // eslint-disable-next-line
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
      toast.success("Status Updated");
    } catch (error) {
      console.log(error);
      toast.error("Status Updated Failed");
    }
  };
  return (
    <>
    <Navbar />
    <section className='flex flex-row  my-40 '>
      <div>
        <AdminMenu active="orders" />
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
                    <Table.Cell>
                    <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                    </Table.Cell>
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

export default AdminOrders
