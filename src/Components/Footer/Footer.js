import React from 'react'
import './Footer.css';
const Footer = () => {
  return (
    
    <div className='footer'>
  <div className='container-fluid'>
    <div className='row '>
      <div className='col-lg-3 col-md-3 col-sm-6 col-12 text-center'>
        <div className='title'>
          <h2>SHOP</h2>
        </div>
        <div className='detail' style={{display:'flex', flexDirection:'column'}}>
          <p>Product 1</p>
          <p>Product 2</p>
          <p>Product 3</p>
          <p>Product 4</p>
        </div>
      </div>
      <div className='col-lg-3 col-md-3 col-sm-6 col-12 text-center'>
        <div className='title'>
          <h2>CONTACT US</h2>
        </div>
        <div className='detail'>
          <p>Number phone: +84 869.999.999</p>
          <p>Email:shop@gmail.com</p>
          <p>Address: 12 Pho Co, HN</p>
        </div>
      </div>
      <div className='col-lg-3 col-md-3 col-sm-6 col-12 text-center'>
        <div className='title'>
          <h2>POLICIES</h2>
        </div>
        <div className='detail'>
         <p>Privacy Policy</p>
         <p>Term of service</p>
         <p>Shipping policy</p> 
         <p>Refund</p> 
        </div>
      </div>
      <div className='col-lg-3 col-md-3 col-sm-6 col-12 text-center'>
        <div className='title'>
          <h2>PAYMENT METHOD</h2>
        </div>
        <div className='detail'>
          <p>Privacy Policy</p>
          <p>Term of service</p>
          <p>Shipping policy</p> 
          <p>Refund</p> 
        </div>
      </div>
    </div>
    <div className="row text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
      <div className="col-12">
        © 2023 Ecommerce.com
      </div>
    </div>
  </div>
</div>
  );
}

export default Footer