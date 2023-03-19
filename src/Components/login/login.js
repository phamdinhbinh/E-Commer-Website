import React, { useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { updateCartsFromLocalStorage } from '../../store/cartSlice';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedValue = localStorage.getItem(username);
    const storedPassword = JSON.parse(storedValue)?.password;
    if (storedPassword === password) {
      const user = {
       nameUser: username,
        login: true
      };
      localStorage.setItem('statusUser', JSON.stringify(user));
      dispatch(updateCartsFromLocalStorage());
      alert('Đăng nhập thành công!');
    } else {
      alert('Sai tên đăng nhập hoặc mật khẩu!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-5 pt-5' >
      <div>
        <label htmlFor="username">Tên đăng nhập:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label htmlFor="password">Mật khẩu:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
  );
};

export default Login;
