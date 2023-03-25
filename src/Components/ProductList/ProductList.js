import React from 'react';
import Product from "../Product/Product";
import { STATUS } from '../../utils/status';
import { useSelector } from "react-redux";
import { getAllProductsStatus } from '../../store/productSlice';
import './ProductList.css';

const ProductList = ({products}) => {
  const productStatus = useSelector(getAllProductsStatus);
  const loading = productStatus === STATUS.LOADING; 

  if (loading) {
    // Nếu dữ liệu đang tải, hiển thị các skeleton loading
    const arr = Array(10).fill(0);
    const skeletonList = arr.map((value, index) => (
      <div className="product-skeleton blink d-flex " key={index}>
        <div className="skeleton-img"></div>
        <div className="skeleton-info mt-2 justify-content-center align-items-center">
          <div className="skeleton-title"></div>
          <div className="skeleton-price my-1"></div>
          <div className="skeleton-title "></div>
        </div>
      </div>
    ));

    return (
      <div className='product-lists row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-4 mt-5'>
        {skeletonList}
      </div>
    );
  }
   
  return (
    <div className='product-lists row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-4 mt-5'>
      {products.map(product => {
        let temp = (product.price) - (product.price * (product.discountPercentage / 100));
        let discountedPrice = temp.toFixed(2);
          
        return (
          <div className="px-1 mb-4" key={product.id}>
            <Product product={{...product, discountedPrice}}  />
          </div>
        )
      })}
    </div>
  );
}

export default ProductList;
