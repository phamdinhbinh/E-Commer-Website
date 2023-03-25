import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductQuantity, deleteProduct, getAllCarts } from '../../store/cartSlice';
import './CartView.css'
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
        dispatch(updateProductQuantity({ id: productId, quantity: parseInt(quantity) }));
        setSelectedProducts(prevSelectedProducts => {
            const index = prevSelectedProducts.findIndex(p => p.id === productId);
            if (index === -1) {
                return prevSelectedProducts;
            } else {
                const newSelectedProducts = [...prevSelectedProducts];
                newSelectedProducts[index].quantity = parseInt(quantity);
                return newSelectedProducts;
            }
        });
    };

    const handleCheckout = () => {
        const grandTotal = selectedProducts.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
        alert(`Grand Total: $${grandTotal.toFixed(2)}`);
        console.log(selectedProducts)
    };

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId));
       
    };

    return (
        <div className="cart-view container bg-light">
            <h1>Shopping Cart</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.some((p) => p.id === product.id)}
                                    onChange={() => handleSelectProduct(product.id)}
                                />
                            </td>
                            <td>{product.title}</td>
                            <td>${product.discountedPrice.toFixed(2)}</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                />
                            </td>
                            <td>${(product.discountedPrice * product.quantity).toFixed(2)}</td>
                            <td>
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
                <tfoot>
                    <tr>
                        <td colSpan={5}></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={4}></td>
                        <td>
                            Grand Total: ${selectedProducts.reduce(
                                (total, product) => total + (product.price * product.quantity),
                                0
                            ).toFixed(2)}
                        </td>
                        <td>
                            <button className="btn btn-primary" onClick={handleCheckout}>
                                Checkout
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default CartView;
