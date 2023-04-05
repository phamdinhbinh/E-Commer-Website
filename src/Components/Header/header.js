import React, {useEffect, useState} from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import {FiHome,FiUser,FiMenu} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux';
import {fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';
import {setSidebarOn} from '../../store/SidebarSlice'
// import { getAllCarts, getStatusLogin, updateCartsFromLocalStorage,getNameUserLogin } from '../../store/cartSlice';
import CartModal from '../nav-cart/navCart';
import './Style.css';
import { setDoc,doc,getDoc  } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { updateToCart,getStatusLogin, getDisplayName, getAllCarts } from '../../store/cartSlice1';
import {  signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, signOut } from 'firebase/auth';

 const fbProvider = new FacebookAuthProvider();
//  const googleProvider = new GoogleAuthProvider();

const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const statusLogin = useSelector(getStatusLogin);
  const nameUserLogin = useSelector(getDisplayName);
  const [searchTerm, setSearchTerm] = useState("");
  

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }
  // Xử lý logic để login với fb
  const handleLogin = async (provider) => {
    const { user } = await signInWithPopup(auth, provider);
    const userRef = doc(db, 'users', user.uid); 
    const userDoc = await getDoc(userRef); 
  
    if (userDoc.exists()) {
      console.log('tài khoản đã tồn tại')
      dispatch(updateToCart());
    
    } else {
      await setDoc(userRef,{ 
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });
    }
  
  };
  // Xử lý logic để logout user
  const handleLogout = async () => {
    await signOut(auth)
    .then(() => {
      // Đăng xuất thành công
      console.log("Đăng xuất thành công");
      console.log( auth.currentUser);
      dispatch(updateToCart());
    })
    .catch((error) => {
      console.log("Đăng xuất thất bại");
    });
  };

  useEffect(() => {
    dispatch(fetchAsyncCategories())
    // dispatch(updateCartsFromLocalStorage())
  }, [dispatch])

  return (
    <>
    <nav className='container-fluid container-header bg-white  px-0  '>
      <nav className='container pt-2 px-0 ' >
        <div className='row header-navbar d-flex '>
          <div className='menu col-4 d-md-none ' onClick={() => dispatch(setSidebarOn())}>
          <FiMenu className='ms-1'></FiMenu>
          </div>

          <div className='logo col-4 col-md-2 d-flex align-items-center justify-content-center'>
              <h4> logo here </h4>
          </div>

        <form className="search-form d-none d-md-flex align-items-center pe-0 border search border-1 rounded-4 bg-white col-6 " role="search">
          <input className="input rounded-0 form-control py-1 px-1 border border-0  " type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearchTerm(e)}/>
          <Link to = {`search/${searchTerm}`} className="btn-nav btn-outline-success border-0  d-flex text-primary align-items-center justify-content-around m-0 h-100 rounded-end-4  " type="submit">
            Search</Link>
        </form>

        <div className='user col-4 col-md-4 d-flex justify-content-end align-items-center '>
          <Link  to='/' className='d-flex user-nav py-8 px-16 justify-content-center  align-items-center '>
            <FiHome  className='mx-2' /> 
            <div className='user-nav-content-home d-none d-md-flex'>
                Trang chủ 
            </div>
          </Link>
          <div className='dropdown'>
            <div className='user-nav d-flex  test py-8 px-16 justify-content-center mx-md-2 align-items-center' type="button" id='dropdownMenuButton' data-bs-toggle="dropdown" aria-expanded="false" >
              <FiUser  className=' mx-2' /> 
              <div className='user-nav-content d-none d-md-block '>
              Tài khoản 
              </div>
            </div>
            { statusLogin?
            <ul className="dropdown-menu">
              <li className='d-flex me-0 align-items-center  justify-content-start'>
                <Link className="dropdown-item text-uppercase fw-bold ps-3" href="#">
                {/* <div className='small pe-1'>Hello!</div> */}
                   {nameUserLogin} </Link>
                </li>
              <li className='me-0'><Link className="dropdown-item w-100" href="#" onClick={() =>handleLogout()}>Logout</Link></li>
              <li className='me-0'><Link to = '/profile' className="dropdown-item w-100" href="#">Profile</Link></li>
            </ul>
            : <ul className='dropdown-menu' >
            <li className='me-0'><Link  className='dropdown-item w-100' href='#' onClick={() => handleLogin(fbProvider)}>Login</Link></li>
            <li className='me-0'><Link to='/register' className='dropdown-item w-100' href='#'>Register</Link></li>
          </ul>
          }
          
        </div>
          

            <Link to='/cart' className='cart-nav d-flex align-items-center justify-content-center py-8 px-16 mx-1'>
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
