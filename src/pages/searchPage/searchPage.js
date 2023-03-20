import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import Loader from '../../Components/Loader/Loader';
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

  if(searchProductsStatus === STATUS.LOADING){
    return (
      <div className='container mt-5' style = {{
        minHeight: "70vh"
      }}>
        <div className='mt-5 py-5 '>
          <Loader />
        </div>
      </div>
    )
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
