import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
} from "./productApiSlice";

// create auth slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    message: null,
    error: null,
    cart: [],

    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },

    setCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id != action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      // get all proudcts
      .addCase(getAllProduct.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.message = action.payload.message;
        state.loader = false;
      })

      // add new product
      .addCase(addProduct.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.data);
        state.message = action.payload.message;
        state.loader = false;
      })
      // edit   product
      .addCase(editProduct.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        (state.products[
          state.products.findIndex((data) => data.id === action.payload.data.id)
        ] = action.payload.data),
          (state.message = action.payload.message);
        state.loader = false;
      })
      // delete  product
      .addCase(deleteProduct.pending, (state, action) => {})
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (i) => i.id !== action.payload.data.id
        );
        state.message = action.payload.message;
      });
  },
});

// selectors
export const getProductData = (state) => state.product;
// actions
export const { setMessageEmpty, setCart, removeCart } = productSlice.actions;

// export
export default productSlice.reducer;
