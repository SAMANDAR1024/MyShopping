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

function Products() {
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
    <div className="flex flex-wrap gap-6 container w-full mx-auto justify-center px-6 py-4">
      {products.map((item) => {
        const isLiked = likedItems.some((liked) => liked.id === item.id);
        return (
          <div key={item.id}>
            <div className="w-64 flex flex-col justify-between h-[400px] relative mb-5 p-6 cursor-pointer bg-white hover:shadow-lg rounded-2xl">
              <Link href={`/product/${item.id}`}>
                <Image
                  width={200}
                  height={250}
                  style={{height:200}}
                  className="object-cover h-[300px] rounded-2xl"
                  src={item.imageUrl}
                  alt="rasm"
                />
              </Link>
                <h2 className="my-2 cursor-pointer">{item.name}</h2>
                <p className="j opacity-90 text-sm">{item.description}</p>
              <div className="flex items-center mt-10 justify-between">
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
      })}
    </div>
  );
}

export default Products;
