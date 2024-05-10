"use client";
import WrapperComponent from "@/components/Providers/Wrapper";
import {
  getProductData,
  removeCart,
  setCart,
} from "@/store/features/product/productSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

// product type
type Product = {
  id: number;
  attributes: {
    name: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export default function Home() {
  const [productsData, setProductsData] = useState([]);
  const { products, loader, cart } = useSelector(getProductData);
  const dispatch = useDispatch();
  const handleAddCart = (data: Product) => {
    toast.success("Item added to cart");
    dispatch(setCart(data));
  };
  const handleRemoveCart = (data: Product) => {
    toast.success("Item remove from cart");
    dispatch(removeCart(data));
  };

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <div>
      <WrapperComponent>
        <div className="py-5 space-y-3">
          <p className="text-2xl font-semibold">Welcome to our shop</p>
          <hr />

          {/* <==========================product div==========================> */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4">
            {productsData?.map((item: Product, key) => {
              return (
                <div
                  key={key}
                  className="  rounded-sm p-2  border shadow-md divide-y-2"
                >
                  <Image
                    src={require("@/assects/product.png")}
                    width={220}
                    height={220}
                    alt="product"
                    className="w-full  object-cover"
                  />{" "}
                  <div className="bg-white  p-2 rounded-sm   flex flex-col  gap-3 ">
                    <p className="font-semibold ">
                      Name : {item.attributes.name}
                    </p>
                    <p className="font-semibold text-sm  text-gray-500 ">
                      Price : {item.attributes.price} tk
                    </p>
                    <p className="font-semibold text-sm  text-gray-500">
                      Stock : {item.attributes.stock}
                    </p>

                    {cart?.includes(item) ? (
                      <button
                        onClick={() => handleRemoveCart(item)}
                        className="bg-red-500 px-3 rounded-sm py-1   mt-3 text-white font-semibold text-sm"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddCart(item)}
                        className="bg-indigo-500 px-3 rounded-sm py-1   mt-3 text-white font-semibold text-sm"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
}
