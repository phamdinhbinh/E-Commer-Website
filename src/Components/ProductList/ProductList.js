import React from 'react';
import Product from "../Product/Product";

const ProductList = ({products}) => {
  return (
    <div className='product-lists row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-4'>
      {
        products.map(product => {
          let temp = (product.price) - (product.price * (product.discountPercentage / 100));
          let discountedPrice = temp.toFixed(2);
          return (
            <div className="col mb-4" key={product.id}>
              <Product product={{...product, discountedPrice}} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductList;
