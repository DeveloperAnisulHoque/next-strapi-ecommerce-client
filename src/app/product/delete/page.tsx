"use client";
import { commonStyle } from "@/components/Styles";
import WrapperComponent from "@/components/Providers/Wrapper";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { deleteProduct } from "@/store/features/product/productApiSlice";
import toast from "react-hot-toast";

export default function Product() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  // handle delete product
  const handleDelete = () => {
    dispatch(deleteProduct(id));
    router.push("/product");
    toast.success("Product delete successfull");
  };
  return (
    <div>
      <WrapperComponent>
        <div className=" w-full sm:w-9/12  md:w-7/12 lg:w-5/12 mx-auto p-5 flex flex-col gap-4 items-center bg-white rounded-2xl shadow-md border shadow-red-100 mt-8">
          <TriangleAlert size={35} color="red" />
          <p className="text-lg text-gray-600  font-bold">Are you sure ? </p>
          <p className="text-sm text-gray-600">Id - {id}</p>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white w-full p-1 font-semibold rounded-md"
          >
            Delete
          </button>
          <Link
            className=" border text-center w-full p-1 font-semibold rounded-md"
            href={"/product"}
          >
            Cancel
          </Link>
        </div>
      </WrapperComponent>
    </div>
  );
}
