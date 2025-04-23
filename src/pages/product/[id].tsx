"use client";
import Shop from "@/components/icons/Shop";
import Products from "@/components/layout/Products";
import { addToCart } from "@/store/slices/cart.slice";
import { ProductType } from "@/store/types";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useDispatch } from "react-redux";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  createdAt: string;
  imageUrl: string;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const res = await fetch(
    `https://nt.softly.uz/api/front/products/${params?.id}`
  );
  const product = await res.json();
  return { props: { product: product } };
};

function Product({ product }: {product: ProductType}) {
  console.log(product);

  const dispatch = useDispatch();
  if (!product) {
    return (
      <div className="cssload-container">
        <ul className="cssload-flex-container">
          <li>
            <span className="cssload-loading cssload-one"></span>
            <span className="cssload-loading cssload-two"></span>
            <span className="cssload-loading-center"></span>
          </li>
        </ul>
      </div>
    );
  }

  const SavatgaQoshish = (product: ProductType) => {
    dispatch(addToCart(product));
  };
  return (
    <>
      <div className="container  mx-auto px-4 sm:px-8 md:px-14 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-full md:w-auto flex justify-center">
            <Image
              width={300}
              height={300}
              src={product.imageUrl}
              alt={product.name}
              className="w-full max-w-[300px] rounded-lg shadow-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {product.name}
            </h1>
            <p className="text-gray-600 text-lg sm:text-2xl mt-2">
              {product.description}
            </p>
            <p className="text-2xl font-semibold text-blue-600 mt-4">
              {product.price.toLocaleString("ru")} So`m
            </p>
            <p className="flex justify-center md:justify-start items-center gap-2 text-lg mt-2">
              <span className="font-medium">Stock:</span>
              <span className="text-red-500">{product.stock}</span>
            </p>

            <div className="flex my-5">
              <button
                className="bg-blue-500 cursor-pointer flex gap-2 p-2 rounded-2xl text-white"
                onClick={() => {
                  SavatgaQoshish(product);
                }}
              >
                <Shop />
                Savatga Qoshish
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">
            Oxshash Mahsulotlar
          </h1>
          <Products />
        </div>
      </div>
    </>
  );
}

export default Product;
