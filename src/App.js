import React from 'react';
import './App.css';
import {BrowserRouter , Router, Route, Routes} from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='productDetail' element={<ProductDetail/>} />
          <Route path='cart' element={<Cart/>} />
        </Route>
      </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
