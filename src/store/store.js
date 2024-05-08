import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import { getAllProduct } from "./features/product/productApiSlice";

// create store
const store = configureStore({
  reducer: {
    product: productReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
  devTools: true,
});

store.dispatch(getAllProduct());
// export
export default store;
