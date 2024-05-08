"use client";
import { commonStyle } from "@/components/Styles";
import WrapperComponent from "@/components/Providers/Wrapper";
import { Delete, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editProduct } from "@/store/features/product/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getProductData } from "@/store/features/product/productSlice";
// initialValues
let initialValuses = {
  name: "",
  price: "",
  stock: "",
};

// Edit product validattion
const editProductValidation = Yup.object({
  name: Yup.string().required("Please Enter name"),
  price: Yup.number().required("Please Enter price"),
  stock: Yup.number().required("Please Enter stock"),
});

export default function Product() {
  const { products } = useSelector(getProductData);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();

  // formik
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: initialValuses,
    validationSchema: editProductValidation,
    onSubmit: (value) => {
      handleReset({});
      handleEditProduct(value);
    },
  });

  // handle update product
  const handleEditProduct = (value) => {
    dispatch(editProduct({ data: value, id }));
    toast.success("Product update successfull");
    router.push("/product");
  };

  // update initialValues by id
  useEffect(() => {
    const data = products?.find((item) => item.id == id);
    console.log(data);
    setFieldValue("name", data?.attributes.name);
    setFieldValue("price", data?.attributes.price);
    setFieldValue("stock", data?.attributes.stock);
  }, [id, products, setFieldValue]);

  return (
    <div>
      <WrapperComponent>
        <div className="py-5 space-y-3  w-full sm:w-10/12 md:w-8/12 lg:w-6/12 ">
          {/* <==========================top div==========================> */}
          <div className="flex justify-between mb-6">
            <p className="text-xl font-semibold">Edit product</p>
            <Link
              href={"/product"}
              className=" bg-blue-600 px-2 rounded-sm font-semibold text-white"
            >
              Back
            </Link>
          </div>

          {/* <==========================add product div==========================> */}
          <div className="  bg-indigo-50 p-5">
            <form onSubmit={handleSubmit}>
              <div className=" ">
                <label htmlFor="name" className="font-semibold ">
                  Product name
                </label>
                {errors.name && (
                  <div className="text-sm text-red-500">{errors.name}</div>
                )}
                <input
                  value={values.name}
                  type="text"
                  id="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-white p-2   w-full   border  my-2 rounded-sm   outline-none"
                />
              </div>
              <div className=" ">
                <label htmlFor="price" className="font-semibold ">
                  Product price
                </label>
                {errors.price && (
                  <div className="text-sm text-red-500">{errors.price}</div>
                )}
                <input
                  value={values.price}
                  type="number"
                  id="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-white p-2 w-full   border  my-2 rounded-sm   outline-none"
                />
              </div>
              <div className=" ">
                <label htmlFor="stock" className="font-semibold ">
                  Product stock
                </label>
                {errors.stock && (
                  <div className="text-sm text-red-500">{errors.stock}</div>
                )}
                <input
                  value={values.stock}
                  type="number"
                  id="stock"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-white p-2 w-full border  my-2 rounded-sm   outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 px-4 mt-5 rounded-sm font-semibold text-white "
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
}
