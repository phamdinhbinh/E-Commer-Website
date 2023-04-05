import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {doc,getDoc,updateDoc,} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product) => {
    // Kiểm tra đăng nhập với Firebase
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
    }

    // Lấy dữ liệu giỏ hàng từ Firestore
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const cart = userData.cart || [];

      // Tìm sản phẩm trong giỏ hàng
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex >= 0) {
        // Sản phẩm đã tồn tại trong giỏ hàng
        const existingProduct = cart[existingProductIndex];
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + product.quantity,
          totalPrice:
            (existingProduct.quantity + product.quantity) * existingProduct.price,
        };
        // Cập nhật sản phẩm trong giỏ hàng
        cart[existingProductIndex] = updatedProduct;
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng
        cart.push(product);
      }

      // Cập nhật giỏ hàng trên Firestore
      await updateDoc(userRef, { cart });
      return cart;
    } else {
      console.log("Không tìm thấy thông tin người dùng");
    }
  }
);

export const updateToCart = createAsyncThunk(
  "cart/updateToCart",
  async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log('update cart khi đăng xuất')
      return {
        cart: [],
        statusLogin: false,
      };
    }

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const cart = userData.cart || [];
      console.log('update cart');
      console.log(user);
      return {
        cart: cart,
        displayName: user.displayName,
        statusLogin: true,
      };
    }
  });

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("Bạn cần đăng nhập để xóa sản phẩm khỏi giỏ hàng");
    }
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const cart = userData.cart || [];
      const productIndex = cart.findIndex((item) => item.id === productId);
      if (productIndex >= 0) {
        cart.splice(productIndex, 1);
      }
      await updateDoc(userRef, { cart });
      return cart;
    } else {
      console.log("User not found");
      throw new Error("Không tìm thấy thông tin người dùng");
    }
  }
);

export const updateQuantityInCart = createAsyncThunk(
  "cart/updateQuantityInCart",
  async ({ productId, quantity }) => {
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const cart = userData.cart || [];

      const existingProductIndex = cart.findIndex((item) => item.id === productId);
      if (existingProductIndex >= 0) {
        const existingProduct = cart[existingProductIndex];
        const updatedProduct = {
          ...existingProduct,
          quantity: quantity,
          totalPrice: quantity * existingProduct.price,
        };
        cart[existingProductIndex] = updatedProduct;
        await updateDoc(userRef, { cart });
        return cart;
      } else { 
        console.log('ko thấy sản phẩm ')
        }
    } else {
      console.log("Không tìm thấy thông tin người dùng");
    }
  }
);



const initialState = {
  carts:[] ,
  statusLogin: false,
  displayName: '',
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(addToCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        console.log(state.carts);
      })
      .addCase(updateToCart.fulfilled, (state, action) => {
        state.carts = action.payload.cart;
        state.statusLogin = action.payload.statusLogin;
        state.displayName = action.payload.displayName;
        console.log(state.carts);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(updateQuantityInCart.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
  },
});

export default cartSlice.reducer;
export const getAllCarts = (state) => state.cart.carts;
export const getStatusLogin = (state) => state.cart.statusLogin;
export const getDisplayName = (state) => state.cart.displayName;
