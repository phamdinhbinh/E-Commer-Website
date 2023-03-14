import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";

const initialState = {
    products: [],
    productSingle: [],

}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
    
        .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
            state.productSingle = action.payload;
        })
    }
});


export const fetchAsyncProducts = createAsyncThunk('products/fetch', async(limit) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await response.json();
    console.log(data);
    return data.products;
});

export const fetchAsyncProductSingle = createAsyncThunk('product-single/fetch', async(id) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
});


export const getAllProducts = (state) => state.product.products;
export const getProductSingle = (state) => state.product.productSingle;
export default productSlice.reducer;

