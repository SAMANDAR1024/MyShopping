"use client";
import Products from "@/components/layout/Products";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

function Product() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (!id) return;
    axios.get(`https://nt.softly.uz/api/front/products/${id}`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, [id]);
  
  if (!id) return <div>ID topilmadi</div>;

  if (!product) {
    return (
      <div className="mx-auto container text-center mt-20 text-4xl ">
        Malumot Yoq
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 md:px-14 py-6">
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
              ${product.price}
            </p>
            <p className="flex justify-center md:justify-start items-center gap-2 text-lg mt-2">
              <span className="font-medium">Stock:</span>
              <span className="text-red-500">{product.stock}</span>
            </p>
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
