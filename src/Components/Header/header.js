import React, {useEffect, useState} from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import {FiHome,FiUser} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux';
import {fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';
import { getAllCarts, getCartItemsCount, getStatusLogin, updateCartsFromLocalStorage,getNameUserLogin } from '../../store/cartSlice';
import CartModal from '../nav-cart/navCart';
import './Style.css';
import UserNav from '../nav-user/nav-user';


const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const statusLogin = useSelector(getStatusLogin);
  const nameUserLogin = useSelector(getNameUserLogin);
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    dispatch(fetchAsyncCategories())
    dispatch(updateCartsFromLocalStorage())
  }, [dispatch])

  return (
    <>
    <nav className='container-fluid container-header bg-white fixed-top  '>
      <nav className='container pt-2 ' >
        <div className='row header-navbar d-flex  '>
          <div className='logo col-4 col-md-2 d-flex align-items-center justify-content-center'>
              <h4> logo here </h4>
          </div>

        <form className="search-form d-none d-md-flex align-items-center pe-0 border search border-1 rounded-4 bg-white col-6 " role="search">
          <input className="input rounded-0 form-control py-1 px-1 border border-0  " type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearchTerm(e)}/>
          <Link to = {`search/${searchTerm}`} className="btn-nav btn-outline-success border-0  d-flex text-primary align-items-center justify-content-around m-0 h-100 rounded-end-4  " type="submit">
            Search</Link>
        </form>

        <div className='user col-8 col-md-4 d-flex justify-content-end align-items-center'>
          <Link  to='/' className='d-flex user-nav py-8 px-16 justify-content-center  align-items-center'>
            <FiHome  className='mx-2' /> 
            <div className='user-nav-content-home d-none d-md-block'>
                Trang chủ 
            </div>
          </Link>
        <div className='dropdown'>
          <div className='user-nav d-flex  test py-8 px-16 justify-content-center mx-2 align-items-center' type="button" id='dropdownMenuButton' data-bs-toggle="dropdown" aria-expanded="false" >
            <FiUser  className=' mx-2' /> 
            <div className='user-nav-content d-none d-md-block '>
              Tài khoản 
            </div>
          </div>
          { statusLogin?
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="#"> {nameUserLogin} </Link></li>
              <li><Link to = '/logout' className="dropdown-item" href="#">Logout</Link></li>
              <li><Link to = '/profile' className="dropdown-item" href="#">Profile</Link></li>
            </ul>
          : <ul className='dropdown-menu' >
            <li><Link to='/login' className='dropdown-item' href='#'>Login</Link></li>
            <li><Link to='/register' className='dropdown-item' href='#'>Register</Link></li>
          </ul>
          }
          
        </div>
          

            <Link to='/cart' className='cart-nav d-flex align-items-center justify-content-center py-8 px-16 ms-1'>
            <FaShoppingCart  className=' mx-1'/>
            <CartModal carts = {carts} />
            </Link>  
          </div>
        </div>

        <div className='row d-none d-md-flex '>
          <div className='col-2'></div>
            <div className='category-nav col-10 d-flex ps-0 my-2 '>
            {
              categories.slice(0, 8).map((category, idx) => (
              <div className='nav-category me-2' key = {idx}>
                <Link to = {`category/${category}`} className='nav-link '>{category.replace("-", " ")}</Link>
              </div>
              ))
            }
          </div>
        </div>
      </nav>
    </nav>
  </>
  );
};

export default Header;
