import React from 'react'
import {Outlet} from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/header';
const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
