import React, {useEffect} from 'react';
import "./Sidebar.css";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/SidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';
import { MdClose } from 'react-icons/md'
const Sidebar = () => {

  const dispatch = useDispatch();
  const test = useSelector(getSidebarStatus) ;
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    console.log(test);
    dispatch(fetchAsyncCategories())
  }, [dispatch])

  return (
    <aside className={`sidebar ${test ? 'hide-sidebar' : ""}`}>
      <button type = "button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
       <MdClose></MdClose>
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
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