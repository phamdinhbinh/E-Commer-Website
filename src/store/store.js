import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer,
        search: searchReducer,
    }
});

export default store;