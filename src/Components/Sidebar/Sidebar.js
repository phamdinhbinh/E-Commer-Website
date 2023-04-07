import React, {useEffect,useState} from 'react';
import "./Sidebar.css";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/SidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';
import { MdClose } from 'react-icons/md'
const Sidebar = () => {

  const dispatch = useDispatch();
  const sideStatus = useSelector(getSidebarStatus) ;
  const categories = useSelector(getAllCategories);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }
  
  useEffect(() => {
    dispatch(fetchAsyncCategories())
  }, [dispatch])

  return (
    <aside className={`sidebar ${sideStatus ? 'hide-sidebar' : ""}`}>
      <button type = "button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
       <MdClose></MdClose>
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
        
        <form className="search-form d-flex align-items-center pe-0 border search border-1 rounded-4 bg-white col-12 " role="search">
          <input className="input rounded-5 form-control py-1 px-1 border border-0  " type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearchTerm(e)}/>
          <Link to = {`search/${searchTerm}`} className="btn-nav btn-outline-success border-0  d-flex text-primary align-items-center justify-content-around m-0 h-100 rounded-end-4  " type="submit" onClick = {() => dispatch(setSidebarOff())}>
            Search</Link>
        </form>

        <ul className='cat-list'>
          {
            categories.map((category, idx) => {
              return (
                <li key = {idx} onClick = {() => dispatch(setSidebarOff())}>
                  <Link to = {`category/${category}`} className='cat-list-link text-capitalize'>{category.replace("-", " ")}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar