import React, { useEffect, useState } from 'react';
import './ProductStyle.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { Link } from "react-router-dom";
import { addToCart } from '../../store/cartSlice1';
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

    useEffect(() => {
        dispatch(fetchAsyncProductSingle(id)).then(() => {
            setDescription(product.category);
        });
    }, [dispatch, id, product.category]);

    const [description, setDescription] = useState('');
    useEffect(() => {
        dispatch(fetchAsyncProductSingle(id)).then(() => {
            setDescription(product.description);
        });
    }, [dispatch, id, product.description]);

    const [showDetail, setShowDetail] = useState(true);
    const [showDetails, setShowDetails] = useState(true);


    useEffect(() => {
        dispatch(fetchAsyncProductSingle(id));
    }, [dispatch, id]);

    if (singleProductStatus === STATUS.LOADING) {
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
    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value);
      };
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
                    <p>Category: {product?.category} / Rating: {product?.rating}</p>
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
                            <input style={{ width: '70%', height: '25px', fontSize: '12px' }} type="number" className="input-text qty text" step="1" min={1} name="quantity" title="Qty" inputMode="numeric" defaultValue={1} onChange={handleQuantityChange} />
                        </div>

                    </div>
                    <div className="section" style={{ paddingBottom: '10px' }}>
                        <button type="button" className='add-to-cart-btn'>
                            <span className='add-to-cart-btn' onClick={() => { addToCartHandler(product) }}>Add to cart</span>
                        </button>
                        <button type="button" className='buy-now btn' >
                            <Link className='btn-buy-now' to="/cart">
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
                        {showDetail && (
                            <div className="description" style={{ paddingTop: '10px', whiteSpace: 'pre-line' }}>
                                {description}
                            </div>
                        )}
                    </div>
                    <div className="section" style={{ paddingBottom: '10px' }} onClick={() => setShowDetails(!showDetails)}>
                        <h4 className="title-attr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #000', paddingBottom: '5px', whiteSpace: 'nowrap' }}>
                            <small style={{ width: '70%', height: '25px' }}>Shipping and Policies</small>
                            <button className="detail-button" style={{ border: 'none', background: 'none', fontSize: '1.5rem' }}>
                                {showDetails ? '-' : '+'}
                            </button>
                        </h4>
                        {showDetails && <p style={{ marginTop: '20px', textAlign: 'justify' }} >Thank you for visiting and shopping at our website! we ship all of our orders via DHL.
                            You will receive an email update with your tracking number once your order has shipped.
                            Standard shipping typically takes between 2-8 business days.
                            If we are experiencing a high volume of orders, shipments may be delayed by a few days.</p>}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Product;