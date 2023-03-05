import React from 'react';
import './ProductStyle.css';
import 'bootstrap/dist/css/bootstrap.css';


const Product = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 item-photo">
                    <img style={{ maxWidth: '60%' }}
                        src="https://product.hstatic.net/1000088324/product/4_ff0673fd351a4b858949cbcddc818790_master.png" />
                </div>
                <div className="col-md-6" style={{ border: '0px', paddingTop:'20px' }}>
                    <h1>T Shirt 001</h1>
                    <h3 style={{ marginTop: '0px' }}>250.000đ</h3>

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