import React, {useEffect} from 'react';
import "./CategoryProductPage.css";
import ProductList from "../../Components/ProductList/ProductList";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductsByCategory, fetchAsyncProductsOfCategory, getCategoryProductsStatus } from '../../store/categorySlice';
import Loader from '../../Components/Loader/Loader';
import { STATUS } from '../../utils/status';

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);
 
  useEffect(() => {
    dispatch(fetchAsyncProductsOfCategory(category));
  }, [dispatch, category]);
  const loading = categoryProductsStatus === STATUS.LOADING; 

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
      <div className='cat-products py-5  mt-5 '>
      <div className='container'>
        <div className='cat-products-content'>
          <div className='title-md'>
            <h3>See our <span className='text-capitalize'>{category.replace("-", " ")}</span></h3>
          </div>
          <div className='product-lists row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-4 mt-5'>
            {skeletonList}
          </div>
        </div>
      </div>
    </div>
    );
  }
  return (
    <div className='cat-products py-5 mt-5 '>
      <div className='container'>
        <div className='cat-products-content'>
          <div className='title-md'>
            <h3>See our <span className='text-capitalize'>{category.replace("-", " ")}</span></h3>
          </div>
             <ProductList products = {categoryProducts} />
        </div>
      </div>
    </div>
  )
}

export default CategoryProductPage