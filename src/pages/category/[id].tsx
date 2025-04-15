"use client";
import Like from "@/components/icons/Like";
import Shop from "@/components/icons/Shop";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
export type CategoriesPage = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  createdAt: string;
  imageUrl: string;
};
function CategorieProduct() {
  const [categoriaPage, setCategoriaPage] = useState<CategoriesPage[]>([]);
  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    if (!id) return;
    axios

      .get(
        `https://nt.softly.uz/api/front/products?categoryId=${id}&page=1&limit=10`
      )
      .then((res) => {
        console.log(res.data.items);
        setCategoriaPage(res.data.items);
      });
  }, [id]);
  if (!id) return <div>ID topilmadi</div>;
  if (!categoriaPage) {
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
  if (categoriaPage.length === 0) {
    return (
      <div className="mx-auto container text-center mt-20 text-4xl ">
        Malumot Yoq
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 container w-full mx-auto px-6 py-4">
      {categoriaPage.map((item) => {
        return (
          <div
            key={item.id}
            className="w-64 h-[400px] flex flex-col justify-between relative mb-5 p-6 cursor-pointer bg-white hover:shadow-lg rounded-2xl"
          >
            <Link href={`/product/${item.id}`}>
              <Image width={200} height={250} src={item.imageUrl} alt="rasm" />

              <h2 className="my-2 text-2xl font-bold cursor-pointer">
                {item.name}
              </h2>
              <p className="j opacity-90 ">{item.description}</p>
            </Link>
            <div className="flex items-center justify-between">
              <p className="cursor-pointer">
                <span className="font-bold text-lg">
                  {item.price.toLocaleString("ru")}
                </span>{" "}
                som
              </p>
              <div className="border-2 cursor-pointer border-amber-500 p-1 rounded-xl">
                <button>
                  <Shop />
                </button>
                <button className="absolute right-3 top-1">
                  <Like />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategorieProduct;
