import Like from "@/components/icons/Like";
import Shop from "@/components/icons/Shop";
import { addToCart } from "@/store/slices/cart.slice";
import { like } from "@/store/slices/like.slice";
import { ProductType, RootState } from "@/store/types";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

function LikedProducts() {
  const dispatch = useDispatch();
  const likedItems = useSelector((state: RootState) => state.likeCart.items);

  const CartQoshish = (product: ProductType) => {
    dispatch(addToCart(product));
  };

  const Liked = (product: ProductType) => {
    dispatch(like(product));
  };
  return (
    <div className="container mx-auto px-16 py-10">
      {likedItems.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold font-mono mb-6">Sevimlilar </h1>
          <div className="grid grid-cols-4 ">
            {likedItems.map((item) => {
              const isLiked = likedItems.some((liked) => liked.id === item.id);

              return (
                <div key={item.id}>
                  <div className="w-64 flex flex-col justify-between h-[400px] relative mb-5 p-6 cursor-pointer bg-white hover:shadow-lg rounded-2xl">
                    <Link href={`/product/${item.id}`}>
                      <Image
                        width={200}
                        height={350}
                        src={item.imageUrl}
                        alt="rasm"
                      />
                      <h2 className="my-2 cursor-pointer">{item.name}</h2>
                      <p className="j opacity-90 text-sm">{item.description}</p>
                    </Link>
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
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex w-96 mx-auto items-center justify-center ">
          <div className="text-center">
            <h2 className="text-2xl font-bold my-3">
              Sevimlilar Royhati bo`sh
            </h2>
            <p>
              Маъқул келган махсулотларни кейинроқ кўриш ёки ҳарид қилиш учун
              севимлилар рўйхатига киритинг.
            </p>
            <Link href={"/"}>
              <button className="cursor-pointer font-bold mt-5 p-2 border-2 rounded-2xl w-46 border-blue-400">
                Asosiy Sahifaga o`tish
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default LikedProducts;
