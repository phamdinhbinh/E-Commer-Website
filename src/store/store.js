import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import SidebarReducer from "./SidebarSlice";
const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer,
        search: searchReducer,
        sidebar: SidebarReducer
    }
});

export default store;