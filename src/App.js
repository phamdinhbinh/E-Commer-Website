import React from 'react';
import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import store from "./store/store";
import Cart from './pages/Cart';
import {Provider} from "react-redux";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import Search from './pages/searchPage/searchPage';
import LogoutButton from './pages/logoutButton/logoutButton';
import CategoryProduct from './pages/categoryProduct/categoryProduct';
function App() {
  return (
    <>
    <Provider store = {store}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='cart' element={<Cart />} />
            <Route path='logout' element={<LogoutButton/>} />
            <Route path = "/search/:searchTerm" element = {<Search />} />
            <Route path = "/category/:category" element = {<CategoryProduct />} />
            <Route path='Register' element = {<Register/>} />
            <Route path='Profile' element = {<Profile/>} />
            <Route path='Login' element = {<Login/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
      
    </>
  );
}

export default App;
