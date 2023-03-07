import React ,{useEffect, useState} from 'react';
import './ProductStyle.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { fetchAsyncProductSingle, getProductSingle, } from '../../store/productSlice';
const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const product = useSelector(getProductSingle);
  
    // getting single product
    useEffect(() => {
      dispatch(fetchAsyncProductSingle(id));
    }, []);

    let temp = (product.price) - (product.price * (product.discountPercentage / 100));

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 item-photo">
                    <img style={{ maxWidth: '60%' }}
                        src={product?(product.images ? product.images[0] : "") : ""} />
                </div>
                <div className="col-md-6" style={{ border: '0px', paddingTop:'20px' }}>
                    <h1>{product?.title}</h1>
                    <h3 style={{ marginTop: '0px' }}>
                            <div className='price'>
                                <div className='old-price '>
                                    ${product?.price.toFixed(2)}
                                </div>
                                <span className='new-price '>
                                    ${temp.toFixed(2)}
                                    </span>
                                <div className='discount  '>
                                ({product.discountPercentage} % OFF )
                                </div>
                            </div>
                        </h3>

                    <div className="section">
                        <h4 className="title-attr" style={{ marginTop: '15px' }}><small>COLOR</small></h4>
                        <div>
                            <div className="attr">BLACK</div>
                            <div className="attr">WHITE</div>
                            <div className="attr">GREEN</div>
                        </div>
                    </div>
                    <div className="section" style={{ paddingBottom: '5px' }}>
                        <h4 className="title-attr"><small>SIZE</small></h4>
                        <div>
                            <div className="attr2">S</div>
                            <div className="attr2">M</div>
                            <div className="attr2">L</div>
                        </div>
                    </div>
                    <div className="section" style={{ paddingBottom: '20px' }}>
                        <h4 className="title-attr"><small>Quantity</small></h4>
                        <div>
                            <div className="btn-minus"><span > - </span></div>
                            <input value="1" />
                            <div className="btn-plus"><span > + </span></div>
                            <button className="btn btn-success"><span style={{ marginLeft: '0px' }} className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Add to cart</button>
                        </div>
                    </div>
                    <div>
                        <img style={{ marginTop: '10px' }} src="https://www.seekpng.com/png/full/110-1105746_secure-checkout-guarantee-safe-checkout-2018.png" alt="logo" width="230" height="50" />
                    </div>
                </div>
            </div>
                <div className="col-xs-16">
                    <ul className="menu-items">
                        <li className="active">Description</li>
                        <li className="active">Policy</li>
                        <li className="active">Contact</li>
                    </ul>
                    <div style={{ width: '100%', borderTop: '1px solid rgb(6, 6, 6)' }}>
                        <p style={{ padding: '15px' }}>
                            <small> abc </small>
                        </p>
                    </div>
                </div>
        </div>
    );
};

export default Product;