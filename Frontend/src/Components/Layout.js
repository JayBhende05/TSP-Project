import React, { Children } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
im

function Layout() {
  return (
    <div>
      <Navbar/>
      <main style={{minHeight: "70vh"}}>{Children}</main>
      <Footer/>
    </div>
  )
}

export default Layout
