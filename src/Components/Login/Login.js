import React from "react";
import {Navigate } from "react-router-dom";
import './Login.css'
import {useSelector, useDispatch} from "react-redux";
import { updateCartsFromLocalStorage,getStatusLogin } from '../../store/cartSlice';
import { useState } from "react";
const Login = () =>
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const statusLogin = useSelector(getStatusLogin);
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
         nameUser:  JSON.parse(storedValue).firstName,
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
        statusLogin ? (<Navigate to ='/' />) : (
            <div style={{marginTop:'100px'}}>
            <div id="intro" className="bg-image shadow-2-strong">
                <div className="mask d-flex align-items-center h-100" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <form onSubmit={handleSubmit} className="bg-white  rounded-5 shadow-5-strong p-5">
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="form1Example1">Email address</label>
                                        <input type="text" id="form1Example1" placeholder="Press your email" className="form-control" value={username} onChange={handleUsernameChange} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="form1Example2">Password</label>
                                        <input type="password" id="form1Example2" placeholder="Press your password" className="form-control" value={password} onChange={handlePasswordChange} />
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check">
                                                
                                                <input className="form-check-input" type="checkbox" value="" id="form1Example3"/>
                                                <label className="form-check-label" for="form1Example3">Remember me</label>
                                            </div>
                                        </div>
                                        <div className="col text-center">
                                            <a href="#!">Forgot password?</a>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                                    </div>
                                    <div className="text-center pt-4 text-muted">Don't have an account? <a href="#">Sign up</a> </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    );
}
export default Login;