import React from "react";
import './nav-user.css';
import { Link } from "react-router-dom";
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
<div className="dropdown">
      <button className=" w-100 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
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