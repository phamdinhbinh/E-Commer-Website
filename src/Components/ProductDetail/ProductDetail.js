import React, { useEffect, useState } from 'react';
import './ProductStyle.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncProductSingle, getProductSingle,getSingleProductStatus } from '../../store/productSlice';
import { Link } from "react-router-dom";
// import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import { addToCart} from '../../store/cartSlice1';
import { STATUS } from '../../utils/status';
const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(getProductSingle);
    const singleProductStatus = useSelector(getSingleProductStatus)
    const [quantity, setQuantity] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);
    const handleClick = (index) => {
        setCurrentImage(index);
    };
    
    const circles = document.querySelectorAll('.attr');
    const [showDetail, setShowDetail] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    // const cartMessageStatus = useSelector(getCartMessageStatus);

    useEffect(() => {
        dispatch(fetchAsyncProductSingle(id));
    }, [dispatch, id]);

    if(singleProductStatus === STATUS.LOADING){
        return (
          <div className='product-skeleton container'>
            <div className='row'>
                <div className='product-skeleton-img col-md-6 '>
                  </div>

                <div className='product-skeleton-title col-md-6 d-flex flex-column  '>
                 <div className='title'>
                  </div>
                <div className='title1'>
                 </div>
                <div className='price'>
                 </div>
                <div className='section1'>
                 </div>
                 <div className='title2'>
                 </div>
                </div>
            </div>
            


          </div>
        )
      }

    let temp = (product.price) - (product.price * (product.discountPercentage / 100));

    const addToCartHandler = (product) => {
        let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
        let totalPrice = quantity * discountedPrice;

        dispatch(addToCart({ ...product, quantity: quantity, totalPrice, discountedPrice }));
       
    }
    return (
        <div id='product-detail-container' className="container product-detail-container">
            <div className="row">
                <div className="col-md-6 images">
                    <div className="main-image" >
                        {product && product.images && product.images[currentImage] && (
                            <img src={product.images[currentImage]} alt={product.title} />
                        )}
                    </div>
                    <div className="thumbnail-images">
                        {product && product.images && product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={product.title}
                                className={currentImage === index ? 'active' : ''}
                                onClick={() => handleClick(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-md-6" style={{ border: '0px', paddingTop: '20px' }}>
                    <h1>{product?.title}</h1>
                    <p>Product Code: {product?.code} / Rating: {product?.rate}</p>
                    <h3 style={{ marginTop: '0px' }}>
                        <div className='price'>
                            <div className='old-price '>
                                ${product && product.price && product.price.toFixed(2)}
                            </div>
                            <span className='new-price '>
                                ${temp && temp.toFixed(2)}
                            </span>
                            <div className='discount  '>
                                ({product.discountPercentage} % OFF )
                            </div>
                        </div>
                    </h3>

                    <div className="section" style={{ paddingBottom: '10px' }}>
                        <h4 className="title-attr"><small>Quantity</small></h4>
                        <div className="quantity" >
                            <input style={{ width: '70%', height: '25px', fontSize: '12px' }} type="number" className="input-text qty text" step="1" min={1} name="quantity" title="Qty" inputMode="numeric" defaultValue={1} />
                        </div>

                    </div>
                    <div className="section" style={{ paddingBottom: '10px' }}>
                        <button type="button" className='add-to-cart-btn'>
                            <span className='add-to-cart-btn' onClick={() => { addToCartHandler(product) }}>Add to cart</span>
                        </button>
                        <button type="button" className='buy-now btn'>
                            <Link to="/cart">
                                <span className='buy-now-btn'>Buy now</span>
                            </Link>
                        </button>

                    </div>
                    <div className="section" style={{ paddingBottom: '10px' }} onClick={() => setShowDetail(!showDetail)}>
                        <h4 className="title-attr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
                            <small style={{ width: '70%', height: '25px' }}>Description</small>
                            <button className="detail-button" style={{ border: 'none', background: 'none', fontSize: '1.5rem' }}>
                                {showDetail ? '-' : '+'}
                            </button>
                        </h4>
                        {showDetail && <p style={{ marginTop: '20px' }}>This is the description text.</p>}
                    </div>
                    <div className="section" style={{ paddingBottom: '10px' }} onClick={() => setShowDetails(!showDetails)}>
                        <h4 className="title-attr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
                            <small style={{ width: '70%', height: '25px' }}>Shipping and Policies</small>
                            <button className="detail-button" style={{ border: 'none', background: 'none', fontSize: '1.5rem' }}>
                                {showDetails ? '-' : '+'}
                            </button>
                        </h4>
                        {showDetails && <p>This is the shipping and policies text.</p>}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Product;