import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const root = "http://localhost:1337/api";

// get all products
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (data) => {
    try {
      const response = await axios.get(root + "/products", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// add product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data) => {
    try {
      const response = await axios.post(
        root + "/products",
        { data },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// edit product
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ data, id }) => {
    try {
      const response = await axios.put(
        root + `/products/${id}`,
        { data },

        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// delete product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      const response = await axios.delete(
        root + `/products/${id}`,

        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
