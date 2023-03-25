import React from 'react'
import {Outlet} from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/header';
import Sidebar from '../Components/Sidebar/Sidebar';
const Layout = () => {
  return (
    <>
    <Sidebar/>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
