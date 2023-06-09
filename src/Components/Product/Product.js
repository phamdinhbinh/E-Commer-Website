import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'
import { STATUS } from '../../utils/status';
const Product = ({product}) => {
  
  return (
    <Link to = {`/product/${product?.id}`} key = {product?.id} className='product d-flex justify-content-center align-items-center text-decoration-none ' to={`/product/${product?.id}`} key={product?.id}>
    <div className='card product-item  p-2'>
      <div className='category '>{product?.category}</div>
      <div className='product-item-img d-flex justify-content-center '>
        <img className='card-img-top ' src={product?.images[0]} alt={product.title} style={{width: "200px", height: "200px", objectFit: "contain"}} />
      </div>
      <div className='product-item-info '>
        <div className='brand d-flex justify-content-center '>
          <div>Brand: </div>
          <div className='brand ms-1'>{product?.brand} </div>
        </div>
        <div className='title py-2'>
          {product?.title}
        </div>
        <div className='price-product d-flex justify-content-center align-items-center'>
          <div className='d-flex w-100 justify-content-center  align-items-center'>
          <div className='old-price '>
            ${product?.price.toFixed(2)}
          </div>
          <span className='new-price mx-1   '>
              ${product?.discountedPrice}
            </span>
          <div className='discount   '>
           (- {product.discountPercentage} % )
          </div>
          </div>
          
        </div>
      </div>
    </div>
  </Link>
  
  )
}

export default Product;

