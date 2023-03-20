import React from "react";
import './nav-user.css';
import { Link } from "react-router-dom";
import {FiHome,FiUser} from 'react-icons/fi';
const UserNav = () => {

return (
//   <div className="user-nav d-flex flex-column  ">
//    <div className="user-nav-item user">
//     Bình 
//    </div>

//     <div className="user-nav-item logOut">
//     Log Out
//     </div>

//     <div className="user-nav-item change-info">
//      Change Information
//     </div>
 
//     <div className="user-nav-item setting">
//      Setting 
//     </div>
     

//   </div>
<div className="dropdown user-nav d-flex  test py-8 justify-content-center align-items-center ">
    
      <button className="user-content border-0 d-flex test py-8 justify-content-center align-items-center " type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <FiUser  className=' mx-2 ' /> 
        tài khoản
      </button>
      <ul className="dropdown-menu" >
        <li><Link className="dropdown-item" href="#"> Bình </Link></li>
        <li><Link className="dropdown-item" href="#">Action</Link></li>
        <li><Link className="dropdown-item" href="#">Another action</Link></li>
        <li><Link className="dropdown-item" href="#">Something else here</Link></li>
      </ul>
</div>
)

}

 export default UserNav