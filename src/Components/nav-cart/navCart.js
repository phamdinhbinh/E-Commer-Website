import React from "react";
import './navCart.css';
import shopping_cart from '../../utils/img/shopping_cart.png'
const CartModal = ({carts}) => {
return (
    <div className="cart-modal">
             <h5 className='cart-modal-title '>Recenlty Added Products</h5>
        {
        (carts?.length > 0) ? (
          <div className='cart-modal-list grid'>
            {
              carts.map(cart => {
                return (
                  <div className='cart-modal-item grid align-items-center py-2' key = {cart.id}>
                    <div className='cart-modal-item-img'>
                      <img src = {cart?.thumbnail} alt = "" className='img-cover' />
                    </div>
                    <div className='cart-modal-item-title '>{cart?.title}</div>
                    <div className='cart-modal-item-price '>
                      ${cart?.discountedPrice.toFixed(2)}
                    </div>
                  </div>
                )
              })
            }

            <div className='view-cart-btn '>View My Shopping Cart</div>
          </div>) : (
          <div className = "d-flex flex-column align-items-center justify-content-center cart-modal-empty">
            <img src = {shopping_cart} alt = "" className='w-50' />
            <h6 className='text-dark fw-4'>No products yet</h6>
          </div>
        )
      }
    </div>
)

}

export default CartModal