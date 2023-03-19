import React from 'react';
import { updateCartsFromLocalStorage } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
function LogoutButton(props) {
    const dispatch= useDispatch();
  const handleLogout = (event) => {
    // Xử lý logic để logout user tại đây
    event.preventDefault();
    const user = {
        nameUser: '',
         login: false
       };
       localStorage.setItem('statusUser', JSON.stringify(user));
       dispatch(updateCartsFromLocalStorage());
       alert('Đăng xuất thành công!');

  };

  return (
    <button  className='mt-5 pt-5' onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
