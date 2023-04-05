import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [errors, setErrors] = useState({});
    

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
   
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    // check first name
    if (!formValues.firstName.trim()) {
      newErrors.firstName = "First name is required.";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    // check last name
    if (!formValues.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

    // check email
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      newErrors.email = "Invalid email address.";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // check password
    if (!formValues.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (formValues.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    } else {
      newErrors.password = "";
    }

    // check confirm password
    if (formValues.password.trim() !== formValues.cPassword.trim()) {
      newErrors.cPassword = "Passwords do not match.";
      valid = false;
    } else {
      newErrors.cPassword = "";
    }
    console.log('test');
    if (valid) {setErrors({})}

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    console.log(isValid);
    if (isValid) {
      const { firstName, lastName, email, password } = formValues;
      const userData = { firstName, lastName, password };
      localStorage.setItem(email, JSON.stringify(userData));
      console.log("User data saved to localStorage:", userData);
    }
  };
  
  

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="wrapper">
        <div className="form-left">
          <h2 className="text-uppercase">information</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Et
            molestie ac feugiat sed. Diam volutpat commodo.
          </p>
          <p className="text">
            <span>Sub Head:</span>
            Vitae auctor eu augudsf ut. Malesuada nunc vel risus commodo
            viverra. Praesent elementum facilisis leo vel.
          </p>
          <div className="form-field">
            <input
              type="submit"
              className="account"
              value="Have an Account?"
            ></input>
          </div>
        </div>
        <form className="form-right" onSubmit={handleSubmit}>
          <h2 className="text-uppercase">Registration form</h2>
          <div className="row">
            <div className="col-sm-6 mb-3">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                className="input-field"
              ></input>
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="col-sm-6 mb-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                className="input-field"
              ></input>
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label>Your Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="input-field"
              required
            ></input>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="row">
            <div className="col-sm-6 mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="input-field"
              ></input>
               {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="col-sm-6 mb-3">
              <label>Current Password</label>
              <input
                type="password"
                name="cPassword"
                value={formValues.cPassword}
                onChange={handleChange}
                className="input-field"
              ></input>
              {errors.cPassword && <p className="error">{errors.cPassword}</p>}
            </div>
        </div>
         <div className="mb-3">
            <label className="option">I agree to the <a href="#">Terms and Conditions</a>
            <input type="checkbox" checked></input>
            <span className="checkmark"></span>
            </label>
             </div>
             <div className="form-field">
             <input type="submit" value="Register" className="register" name="register" ></input>
             </div>
             </form>
                </div>
            </div>
    
    );
}
export default Register;