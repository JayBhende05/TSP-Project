import React from 'react'
import Opening from '../assets/videos/Home.mp4'
import Grid from '../Components/homeComponents/Grid'
import Categories from '../Components/homeComponents/Categories'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

// -------------Images for Grid--------------------
import img1 from "../assets/images/Logo/rolex.jpg"
import img2 from "../assets/images/Logo/patek.jpg"
import img3 from "../assets/images/Logo/cartier.jpg"
import img4 from "../assets/images/Logo/tudor.jpg"
import img5 from "../assets/images/Logo/omega.jpg"
import img6 from "../assets/images/Logo/breitling.jpg"
import img7 from "../assets/images/Logo/tag-heuer.jpg"
import img8 from "../assets/images/Logo/hublot.jpg"
import img9 from "../assets/images/Logo/grand-seiko.jpg"


// ------------------Images for Carousel---------------
import Carousellg from '../Components/homeComponents/Carousellg'
import Carouselsm from '../Components/homeComponents/Carouselsm'
import { useAuth } from '../context/auth'




function Home() {
  // eslint-disable-next-line
  const [auth, setAuth]= useAuth();
  return (
    <>
    <Navbar bg="transparent" color="white" />
      {/* Front Page Section  */}
      <section className=' absolute w-full'>
        <div className=''>
          <video className='h-auto sm:h-80 lg:h-full w-full z-0 object-cover  ' src={Opening} autoPlay loop muted />
        </div>
        <div className='font-simple  px-3 absolute top-20 sm:top-28 sm:px-5 lg:top-60 '>
          <p className=' leading-none text-white text-base sm:text-xl md:text-2xl  lg:text-6xl'>The Exotic </p>
          <p className='font-bold  text-white text-xl leading-none sm:text-3xl sm:leading-5 md:text-4xl md:leading-6  lg:text-8xl'>Rolex Collection </p>
          <div className=' sm:my-2 md:my-4'>
            <a href='/' className='text-[7px] px-[4px] py-[4px]  rounded-xl font-simple text-black bg-white sm:text-xs md:text-sm  lg:text-2xl lg:my-1 lg:px-2 '>BUY A ROLEX</a>
          </div>
        </div>
      {/* Logo  */}
      <Grid img1={img1} img2={img2} img3={img3} img4={img4} img5={img5} img6={img6} img7={img7} img8={img8} img9={img9} /> 

 

     

      
      {/* Carousel  */}
        <Carouselsm />
        <Carousellg />

      {/* Categories  */}
        <Categories />
      
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      {/* Footer */}
        <Footer/>
         
      </section>
    </>

  );
}

export default Home;


     

   

    
      

      














