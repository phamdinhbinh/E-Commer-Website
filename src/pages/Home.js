import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from '../Components/ProductList/ProductList';
import HeaderSlider from '../Components/slider/slider';
import { fetchAsyncProducts, getAllProducts,getAllProductsStatus} from '../store/productSlice';
import Loader from "../../src/Components/Loader/Loader";
import { STATUS } from '../../src/utils/status';
const HomePage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, []);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);
  // randomizing the products in the list
  const tempProducts = [];
  if(products.length > 0){
    for(let i in products){
      let randomIndex = Math.floor(Math.random() * products.length);

      while(tempProducts.includes(products[randomIndex])){
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  return (
    <main>
      
      <div className='main-content  bg-light '>
        <div className='container '>
          <HeaderSlider/>
          <div className='categories py-md-5 '>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              {  <ProductList products = {tempProducts} />}
            </div>

            
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage