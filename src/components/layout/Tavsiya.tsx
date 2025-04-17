import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Like from "../icons/Like";
import Shop from "../icons/Shop";
import { addToCart } from "@/store/slices/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, RootState } from "@/store/types";
import { like } from "@/store/slices/like.slice";

function Tavsiya() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const likedItems = useSelector((state: RootState) => state.likeCart.items);
  useEffect(() => {
    axios
      .get(`https://nt.softly.uz/api/front/products?page=1&limit=10`)
      .then((res) => {
        console.log(res.data.items);
        setProducts(res.data.items);
      });
  }, []);

  const CartQoshish = (product: ProductType) => {
    dispatch(addToCart(product));
  };

  const Liked = (product: ProductType) => {
    dispatch(like(product));
  };

  if (!products) {
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
  return (
    <div className="flex flex-col overflow-auto gap-2 container w-full mx-auto px-6 py-4">
      {products.slice(1, 10).map((item) => {
        const isLiked = likedItems.some((liked) => liked.id === item.id);
        return (
          <div key={item.id}>
            <div className="w-[1350px] flex items-center gap-5 border justify-between relative  p-6 cursor-pointer bg-white hover:shadow-lg rounded-2xl">
              <Link
                className="flex items-center gap-5"
                href={`/product/${item.id}`}
              >
                <Image width={80} height={80} src={item.imageUrl} alt="rasm" />
                <div>
                  <h2 className="my-1 text-2xl cursor-pointer">{item.name}</h2>
                  <p className=" opacity-90 text-sm">{item.description}</p>
                </div>
              </Link>
              <div className="flex items-center mt-1 justify-between">
                <div className="pr-10 flex flex-col gap-2">
                  <p className="cursor-pointer text-end">
                    <span className="font-bold text-2xl ">
                      {item.price.toLocaleString("ru")}
                    </span>{" "}
                    som
                  </p>
                  <div className="border-2 flex cursor-pointer bg-blue-500 text-white border-blue-500 p-2 rounded-xl">
                    <button
                      className="cursor-pointer flex"
                      onClick={() => CartQoshish(item)}
                    >
                      Savatga Qoshish <Shop />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => Liked(item)}
                  className="absolute right-3 top-1"
                >
                  {isLiked ? (
                    <span className="text-red-500 text-xl cursor-pointer">
                      ❤️
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xl">
                      <Like />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tavsiya;
