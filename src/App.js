import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import store from "./store/store";
import Cart from './pages/Cart';
import {Provider} from "react-redux";
import Login from '././Components/Login/Login';
import Profile from '././Components/Profile/Profile';
import Search from './pages/searchPage/searchPage';
import CategoryProduct from '././pages/CategoryProductPage/CategoryProductPage';
import PrivateRoute from './pages/PrivateRoute';
import Loginfb from './Components/Login/LoginFb';
function App() {
  return (
    <>
    <Provider store = {store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path="/cart" element={<Cart/>} />
            {/* <Route path="/cart" element={<PrivateRoute component ={Cart} />} /> */}
            <Route path="/Profile" element={<PrivateRoute component={Profile} />} />
            <Route path = "/search/:searchTerm" element = {<Search />} />
            <Route path = "/category/:category" element = {<CategoryProduct />} />
            {/* <Route path='Profile' element = {<Profile/>} /> */}
            <Route path='Login' element = {<Login/>} />
            <Route path='Loginfb' element = {<Loginfb/>} />
          </Route>
        </Routes>
        
      </BrowserRouter>
    </Provider>
      
    </>
  );
}

export default App;
