"use client";
import { commonStyle } from "@/components/Styles";
import WrapperComponent from "@/components/Providers/Wrapper";
import { Delete, Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getProductData } from "@/store/features/product/productSlice";
import { useEffect, useState } from "react";

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

export default function Product() {
  const [productsData, setProductsData] = useState([]);

  const { products, loader } = useSelector(getProductData);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <div>
      <WrapperComponent>
        <div className="py-5 space-y-3">
          {/* <==========================top div==========================> */}
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Manage products</p>
            <Link
              href={"/product/add"}
              className=" bg-blue-600 px-2 rounded-sm font-semibold text-white"
            >
              Add new
            </Link>
          </div>{" "}
          <div className="  px-4    flex items-center gap-2">
            <div className="w-6/12 font-semibold">name</div>
            <div className="w-2/12 text-sm"> price </div>
            <div className="w-2/12 text-sm"> stock </div>
            <div className="w-2/12 text-end text-sm  ">Actions</div>
          </div>
          <hr />
          {/* <==========================product div==========================> */}
          <div className=" flex flex-col  pb-4 gap-4">
            {productsData?.map((item: Product, key) => {
              return (
                <div
                  key={key}
                  className="bg-white px-4  py-2 shadow-md border rounded-md flex items-center gap-2"
                >
                  <div className="w-6/12 font-semibold">
                    {item.attributes.name}
                  </div>
                  <div className="w-2/12 text-sm">{item.attributes.price}</div>
                  <div className="w-2/12 text-sm">{item.attributes.stock}</div>
                  <div className="w-2/12 flex gap-2 justify-end">
                    <Link href={`/product/edit?id=${item.id}`}>
                      <Edit className={`${commonStyle.icon} bg-blue-200`} />
                    </Link>
                    <Link href={`/product/delete?id=${item.id}`}>
                      <Trash
                        className={`${commonStyle.icon} cursor-pointer bg-red-200  `}
                        color="red"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* <==========================  product loader div ==========================> */}

            {loader && <div>loading . .. . </div>}
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
}
