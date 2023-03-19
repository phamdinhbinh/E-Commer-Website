import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductSingle} from '../../store/productSlice';
import { updateProductQuantity, deleteProduct } from '../../store/cartSlice';

const CartView = () => {
    const { id } = useParams();
    const products = useSelector(getProductSingle);
    const dispatch = useDispatch();

    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleSelectProduct = (productId) => {
        const index = selectedProducts.findIndex((p) => p.id === productId);
        if (index === -1) {
            setSelectedProducts([...selectedProducts, { id: productId }]);
        } else {
            const newSelectedProducts = [...selectedProducts];
            newSelectedProducts.splice(index, 1);
            setSelectedProducts(newSelectedProducts);
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        dispatch(updateProductQuantity({ id: productId, quantity: parseInt(quantity) }));
    };

    const handleCheckout = () => {
        const grandTotal = selectedProducts.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
        alert(`Grand Total: $${grandTotal.toFixed(2)}`);
    };

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId));
    };

    return (
        <div className="container mt-4">
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
                        <tr key={product.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.some((p) => p.id === product.id)}
                                    onChange={() => handleSelectProduct(product.id)}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                />
                            </td>
                            <td>${(product.price * product.quantity).toFixed(2)}</td>
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
                                (total, product) => total + product.price * product.quantity,
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
