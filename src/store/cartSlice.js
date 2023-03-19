import {createSlice} from "@reduxjs/toolkit";

export const getCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('statusUser');
    if (cartData) {
      const cartObject = JSON.parse(cartData);
      console.log(cartObject.login);
    if (cartObject.login === true) {
        const getCart = JSON.parse(localStorage.getItem(cartObject.nameUser));
        console.log('đây này ',getCart);
        return getCart.Cart;
    }
    
    return []; 
    }
    return [];
  };

  const storeInLocalStorage = (data) => {
    const cartObject = JSON.parse(localStorage.getItem('statusUser'));
    const cartData = JSON.parse(localStorage.getItem(cartObject.nameUser));
    const updatedCartData = {
      ...cartData,
      Cart: data
    };
    localStorage.setItem(cartObject.nameUser, JSON.stringify(updatedCartData));
  }
  

const initialState = {
    carts: getCartFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isCartMessageOn: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log('sau',action.payload);
            const isItemInCart = state.carts.find(item => item.id === action.payload.id);

            if(isItemInCart){
                const tempCart = state.carts.map(item => {
                    console.log(item.quantity);
                    if(item.id === action.payload.id){
                        let tempQty = item.quantity + action.payload.quantity;
                        let tempTotalPrice = tempQty * item.price;

                        return {
                            ...item, quantity: tempQty, totalPrice: tempTotalPrice
                        }
                    } else {
                        return item;
                    }
                });

                state.carts = tempCart;
                storeInLocalStorage(state.carts);
                
            } else {
                state.carts.push(action.payload);
                storeInLocalStorage(state.carts);
            }
           
        },

        removeFromCart: (state, action) => {
            const tempCart = state.carts.filter(item => item.id !== action.payload);
            state.carts = tempCart;
            
        },

        clearCart: (state) => {
            state.carts = [];
            
        },

        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice
            }, 0);

            state.itemsCount = state.carts.length;
        },

        toggleCartQty: (state, action) => {
            const tempCart = state.carts.map(item => {
                if(item.id === action.payload.id){
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;

                    if(action.payload.type === "INC"){
                        tempQty++;
                        if(tempQty === item.stock) tempQty = item.stock;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    if(action.payload.type === "DEC"){
                        tempQty--;
                        if(tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    return {...item, quantity: tempQty, totalPrice: tempTotalPrice};
                } else {
                    return item;
                }
            });

            state.carts = tempCart;
            
        },

        setCartMessageOn: (state) => {
            state.isCartMessageOn = true;
            
        },

        setCartMessageOff: (state) => {
            state.isCartMessageOn = false;
        },

        updateCartsFromLocalStorage: (state) => {
            state.carts = getCartFromLocalStorage();
        }

    }
});

export const {addToCart, updateCartsFromLocalStorage, setCartMessageOff, setCartMessageOn, getCartTotal, toggleCartQty, clearCart, removeFromCart} = cartSlice.actions;
export const getAllCarts = (state) => state.cart.carts;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;

export default cartSlice.reducer;