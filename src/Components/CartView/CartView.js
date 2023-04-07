import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCarts, removeFromCart, updateQuantityInCart } from '../../store/cartSlice1';
// import './CartView.css'
const CartView = () => {

    const products = useSelector(getAllCarts);
    const dispatch = useDispatch();

    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        setSelectedProducts(products.map(p => ({ id: p.id, price: p.discountedPrice, quantity: p.quantity })));
    }, [products]);

    const handleSelectProduct = (productId) => {
        setSelectedProducts(prevSelectedProducts => {
            const product = products.find(p => p.id === productId);
            if (!product) {
                return prevSelectedProducts;
            }
            const index = prevSelectedProducts.findIndex(p => p.id === productId);
            if (index === -1) {
                return [...prevSelectedProducts, { id: productId, price: product.discountedPrice, quantity: product.quantity }];
            } else {
                const newSelectedProducts = [...prevSelectedProducts];
                newSelectedProducts.splice(index, 1);
                return newSelectedProducts;
            }
        });
    };

    const handleQuantityChange = (productId, quantity) => {
        dispatch(updateQuantityInCart({ productId, quantity: parseInt(quantity) }));
    };
    const handleDelete = (productId) => {
        dispatch(removeFromCart(productId));

    };

    return (
        <div className="container mt-5 pt-2">
          <h1 className="text-center my-5">Shopping Cart</h1>
          <div className="row">
          <div className=" col-md-8">
          <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th className='col-1 col-md-1'></th>
                    <th className="col-4 col-md-2">Product</th>
                    <th className="col-1 col-md-1">Qty</th>
                    <th className="col-1 col-md-2">Unit Price</th>
                    <th className="col-1 col-md-2">Total Amount</th>
                    <th className="col-1 col-md-1">More</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.index}>
                    <td className='col-1 col-md-1'>
                        <input
                        type="checkbox"
                        checked={selectedProducts.some((p) => p.id === product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        />
                    </td>
                    <td className="col-4 col-md-2">{product.title}</td>

                    <td className="col-1 col-md-1">
                        <input
                        type="number"
                        min="1"
                        max="100"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        />
                    </td>
                    <td className="col-1 col-md-2">${product.discountedPrice.toFixed(2)}</td>

                    <td className="col-1 col-md-2">${(product.discountedPrice * product.quantity).toFixed(2)}</td>
                    <td className="col- col-md-1">
                        <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(product.id)}
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
</div>

  </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <p className="card-text">Items: {selectedProducts.length}</p>
                  <p className="card-text">Total: ${products.reduce(
                    (total, product) => {
                      const selectedProduct = selectedProducts.find(p => p.id === product.id);
                      if (selectedProduct) {
                        return total + (selectedProduct.price * selectedProduct.quantity);
                      }
                      return total;
                    },
                    0
                  ).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-primary w-100"
                    // onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
      
};

export default CartView;
