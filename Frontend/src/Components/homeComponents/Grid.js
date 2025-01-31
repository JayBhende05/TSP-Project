import React from 'react'


function Grid(props) {
    const{img1,img2,img3,img4,img5,img6,img7,img8,img9} = props
  return (
    <div>
        <div className='mx-4 lg:py-10 py-3  grid grid-rows-2 sm:grid-rows-1 grid-flow-col content-center '>
          <a href="/" className='px-1 py-2 lg:px-2 lg:py-3'>
            <img src={img1} alt="Rolex Logo" className=' w-20 lg:w-40' />
          </a>
          <a href="/" className='px-1 py-2 lg:px-2 lg:py-3'>
            <img src={img2} alt="Patek-Philippe Logo" className=' w-20 lg:w-40' />
          </a>
          <a href="/" className='px-1 py-2 lg:px-2 lg:py-3'>
            <img src={img9} alt="Patek-Philippe Logo" className=' w-20 lg:w-40' />
          </a>
          <a href="/" className='px-1 py-2 lg:px-2 lg:py-3'>
            <img src={img3} alt="Cartier Logo" className=' w-20 lg:w-40'/>
          </a>
          <a href="/" className='px-1 py-2 lg:px-2 lg:py-3'>
            <img src={img4} alt="tudor Logo" className=' w-20 lg:w-40'/>
          </a>
          <a href="/" className='px-1 py-2 lg:px-2 lg:py-3'>
            <img src={img5} alt="omega Logo" className=' w-20 lg:w-40' />
          </a>
          <a href="/" className='px-1 py-2 lg:px-2 lg:py-3'>
            <img src={img6} alt="breitling Logo" className=' w-20 lg:w-40' />
          </a>
          <a href="/" className='px-1 py-2 lg:px-2 lg:py-3'>
            <img src={img7} alt="tag-heuer Logo" className=' w-20 lg:w-40' />
          </a>
          <a href="/" className='px-1 py-2 lg:px-2 lg:py-3'>
            <img src={img8} alt="hubolt Logo" className=' w-20 lg:w-40' />
          </a>
        </div>
      
    </div>
  )
}

export default Grid
