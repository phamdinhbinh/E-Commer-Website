import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import ProductList from '../../Components/ProductList/ProductList';
import { fetchAsyncSearchProduct, getSearchProducts, getSearchProductsStatus, clearSearch } from '../../store/searchSlice';

const SearchPage = () => {
  const dispatch = useDispatch();
  const {searchTerm } = useParams();
  const searchProducts = useSelector(getSearchProducts);
  const searchProductsStatus = useSelector(getSearchProductsStatus);

  useEffect(() => {
    dispatch(clearSearch());
    dispatch(fetchAsyncSearchProduct(searchTerm));
  }, [searchTerm]);

  const loading = searchProductsStatus === STATUS.LOADING; 

  if (loading) {
    // Nếu dữ liệu đang tải, hiển thị các skeleton loading
    const arr = Array(10).fill(0);
    const skeletonList = arr.map((value, index) => (
      <div className="product-skeleton blink d-flex justify-content-center " key={index}>
        <div className="skeleton-img"></div>
        <div className="skeleton-info mt-2 justify-content-center align-items-center">
          <div className="skeleton-title"></div>
          <div className="skeleton-price my-1"></div>
          <div className="skeleton-title "></div>
        </div>
      </div>
    ));

    return (
      <div className='search-content mt-5'>
      <div className='container'>
        <div className='py-5'>
          <div className='title-md'>
            <h3>Search results:</h3>
          </div>
          <br />
          <div className='product-lists row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-4 mt-5'>
            {skeletonList}
          </div>
        </div>
      </div>
    </div>
    );
  }

  if(searchProducts.length === 0){
    return (
      <div className='container mt-5' style = {{
        minHeight: "70vh"
      }}>
        <div className='mt-5 py-5 '>
          <h3>No Products found.</h3>
        </div>
      </div>
    )
  }

  return (
    <main>
      <div className='search-content mt-5'>
        <div className='container'>
          <div className='py-5'>
            <div className='title-md'>
              <h3>Search results:</h3>
            </div>
            <br />
            <ProductList products = {searchProducts} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default SearchPage;
