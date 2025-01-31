import React from 'react'
import Navbar from '../../Components/Navbar'
import AdminMenu from '../../Components/AdminMenu'
import { useEffect, useState } from "react"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {  Table} from 'flowbite-react'
import { Modal } from 'antd';

import CategoryForm from '../../Components/Form/CategoryForm'

function CreateCategory() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");


  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/v1/category/create-category', { name })
      if (data?.success) {
        toast.success(`${name} is Created `);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in Input Form")

    }
  }

  //getting All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category')
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in getting category")

    }
  };

  useEffect(() => {
    getAllCategory();
  }, [])

  //Update Category
  const handleUpdateSubmit = async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name:updateName})
      if(data.success){
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong")
      
    }
  }

  //Delete Category
  const handleDelete = async(pid)=>{
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pid}`, {name:updateName})
      if(data.success){
        toast.success(`Category is deleted`);
        getAllCategory();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong")
      
    }
  }
  return (
    <>
      <Navbar />
      <section className='flex flex-row justify-center justify-items-center my-40 '>
        <div>
          <AdminMenu active="create-category" />
        </div>

        <div className="min-w-sm w-1/2 mx-auto ">
          <h1 className='font-simple text-4xl underline my-10 text-center '>Manage Category</h1>
          <div className='my-5'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <div className=' ' >
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>
                  Category
                </Table.HeadCell>

                <Table.HeadCell>
                  Actions
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {categories?.map((category) => {
                  return (<>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <span key={category._id} >{category.name}</span>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="font-medium text-base hover:border-2 hover:rounded-lg px-3 py-1 text-blue-600 hover:underline hover:bg-blue-600 hover:text-white text-center dark:text-blue-500 cursor-pointer" onClick={()=> {setVisible(true); setSelected(category); setUpdateName(category.name)}} >Edit</span>



                        <span className=" mx-5 font-medium text-base hover:border-2 hover:rounded-lg px-3 py-1 text-red-600 hover:underline hover:bg-red-600 hover:text-white text-center dark:text-red-500 cursor-pointer " onClick={()=>{ handleDelete(category._id)}}>Delete</span>

                      </Table.Cell>
                    </Table.Row>
                  </>
                  )
                })}

              </Table.Body>
            </Table>

          </div>
          <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible} >

          <CategoryForm value={updateName} handleSubmit={handleUpdateSubmit}  setValue={setUpdateName} />

          </Modal>
         
        </div>

      </section>

    </>
  )
}

export default CreateCategory
