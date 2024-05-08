"use client";
import React, { useState } from "react";
import WrapperComponent from "../Providers/Wrapper";

import NavItems from "../NavItems/NavItems";
import { Delete, ShoppingCart } from "lucide-react";
import { commonStyle } from "../Styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductData,
  removeCart,
} from "@/store/features/product/productSlice";

const Header = () => {
  const [cartDiv, setCartDiv] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector(getProductData);
  const handleRemoveCart = (data) => {
    dispatch(removeCart(data));
  };
  return (
    <div className="w-full bg-indigo-400 py-3 ">
      <WrapperComponent>
        <div className="flex justify-between">
          <NavItems navList={["product"]} />
          <div className="relative">
            <ShoppingCart
              onClick={() => setCartDiv(true)}
              className={`${commonStyle.icon} cursor-pointer`}
            />
            {cart.length > 0 && (
              <span className="absolute top-[-10px] right-[-14px]  bg-black text-white w-6 h-6 text-sm font-semibold flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* <================card div=================> */}
          {cartDiv && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30  flex  ">
              <div
                className=" w-4/12  sm:w-6/12   md:w-8/12 lg:w-9/12 h-full"
                onClick={() => setCartDiv(false)}
              ></div>
              <div className=" w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12 bg-white h-full p-4 ">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Your cart</p>
                  <button
                    onClick={() => setCartDiv(false)}
                    className="flex text-sm items-center border px-1 hover:bg-blue-500 hover:text-white duration-200 border-blue-400 gap-1 rounded-md text-blue-500 font-semibold "
                  >
                    Close <Delete />
                  </button>
                </div>

                {/* <=============All Cart items===================> */}
                <div className="flex flex-col gap-2 py-5  ">
                  {/* <=============Single Cart item===================> */}
                  {cart?.map((item, key) => {
                    return (
                      <div
                        key={key}
                        className="border p-4 space-y-2 rounded-md"
                      >
                        <p className="font-semibold">{item.attributes.name}</p>
                        <p className="text-sm">{item.attributes.price}</p>
                        <button
                          onClick={() => handleRemoveCart(item)}
                          className="bg-red-500 px-3 rounded-sm py-1   mt-3 text-white font-semibold text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </WrapperComponent>
    </div>
  );
};

export default Header;
