import React from 'react'

function CategoryForm({handleSubmit,value,setValue}) {

  return (
    <>
      <div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
        Enter Category
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category" type="text" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Enter new category"/>
    </div>
    
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>
      
    </div>
  </form>
 
</div>
    </>
  )
}

export default CategoryForm
