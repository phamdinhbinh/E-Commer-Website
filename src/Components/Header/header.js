import React from 'react'
import {FaUser, FaShoppingCart} from "react-icons/fa"
import { Link } from 'react-router-dom'
import './Style.css';
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-info bg-gradient fixed-top ">
    <div className="container-fluid mx-md-2 mx-lg-5">
    <Link className="navbar-brand  order-1 me-0 me-md-2 " href="#">Logo Brand</Link>
    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse order-4 order-md-1 mt-1 mt-sm-0" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 row-cols-2  ">
        <li className="nav-item  ">
          <Link className="nav-link p-1 text-dark h-100 w-100  d-inline-block  "  href="#">Home</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link p-1 text-dark h-100 w-100 d-inline-block " href="#">Link</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link p-1 text-dark h-100 w-100 d-inline-block" href="#">Link</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link p-1 text-dark h-100 w-100 d-inline-block" href="#">Link</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link p-1 text-dark h-100 w-100 d-inline-block" href="#">Link</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link p-1 text-dark h-100 w-100 d-inline-block" href="#">Link</Link>
        </li>
      </ul>
      <form className="d-flex border border-1 rounded bg-white " role="search">
        <input className=" form-control me-1 border border-0 " type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success m-1 border border-0 border border-start rounded-0  " type="submit">Search</button>
      </form>
      
    </div>
    <div className='order-3'>
        <FaUser size='28px' className='mx-3' />
        <FaShoppingCart size='28px' className='mx-1'/>
      </div>
  </div>
</nav>
    </>
  )
}

export default Header