import { addToCart } from "@/store/slices/cart.slice";
import { like } from "@/store/slices/like.slice";
import { ProductType, RootState } from "@/store/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Like from "../icons/Like";
import Shop from "../icons/Shop";
type Props = {
  item: ProductType;
};
function ProductCard({ item }: Props) {
  const dispatch = useDispatch();
  const likedItems = useSelector((state: RootState) => state.likeCart.items);

  const CartQoshish = (product: ProductType) => {
    dispatch(addToCart(product));
  };

  const Liked = (product: ProductType) => {
    dispatch(like(product));
  };
  const isLiked = likedItems.some((liked) => liked.id === item.id);
  return (
    <div key={item.id}>
      <div className="w-64 flex flex-col gap-0 justify-between h-[400px] relative  p-6 cursor-pointer bg-white hover:shadow-lg rounded-2xl">
        <Link href={`/product/${item.id}`}>
          <Image width={200} className="object-cover h-[250px] rounded-2xl" height={100} style={{height:250}}  src={item.imageUrl} alt="rasm" />
        </Link>
        <h2 className="my-2 cursor-pointer">{item.name}</h2>
        <p className="j opacity-90 text-sm">{item.description}</p>
        <div className="flex items-center  justify-between">
          <p className="cursor-pointer">
            <span className="font-bold text-lg">
              {item.price.toLocaleString("ru")}
            </span>{" "}
            som
          </p>
          <div className="border-2 cursor-pointer border-amber-500 p-1 rounded-xl">
            <button
              className="cursor-pointer"
              onClick={() => CartQoshish(item)}
            >
              <Shop />
            </button>
            <button
              onClick={() => Liked(item)}
              className="absolute right-3 top-1"
            >
              {isLiked ? (
                <span className="text-red-500 text-xl cursor-pointer">❤️</span>
              ) : (
                <span className="text-gray-400 text-xl">
                  <Like />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
