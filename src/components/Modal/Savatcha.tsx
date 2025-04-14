import { minusCount, plusCount, removeCart } from "@/store/slices/cart.slice";
import { RootState } from "@/store/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Remove from "../icons/remove";

export type Savat = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Savatcha: React.FC<Savat> = ({ modal, setModal }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();

  const remove = (id: number) => {
    dispatch(removeCart(id));
  };
  if (!modal) return null;

  return (
    <div
      className="fixed z-20 inset-0  bg-opacity-75 bg-black/90 flex justify-center items-center"
      onClick={() => setModal(false)} // Modalni yopish
    >
      <div
        className="bg-white p-8 rounded-lg  w-[1000px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex  justify-between mb-5">
          <h2 className="text-3xl font-semibold">Savatcha</h2>
          <p
            className=" text-3xl  font-bold cursor-pointer"
            onClick={() => setModal(false)} // Modalni yopish
          >
            &times;
          </p>
        </div>
        <div className="text-center flex flex-col">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex border rounded-2xl my-2 px-5  justify-between items-center py-2"
                >
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.imageUrl}
                      width={70}
                      height={70}
                      alt="img"
                    />
                    <p className="text-2xl">{item.name}</p>
                  </div>

                  <div className="flex gap-5 items-center">
                    <button
                      onClick={() => {
                        dispatch(minusCount(item.id));
                      }}
                      className="p-2 border rounded-2xl w-10 h-10 cursor-pointer"
                    >
                      -
                    </button>
                    <p>{item.count}</p>
                    <button
                      onClick={() => {
                        dispatch(plusCount(item.id));
                      }}
                      className="p-2 border rounded-2xl w-10 h-10 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex gap-2 items-center">
                    <p className="text-xl font-bold font-mono">
                      {(item.count * item.price).toLocaleString("ru")} So`m
                    </p>
                    <button
                      onClick={() => remove(item.id)}
                      className="text-2xl text-red-500 border-2 p-2 rounded-2xl  cursor-pointer"
                    >
                      <Remove />
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center flex flex-col">
              <h2 className="text-2xl font-bold">Savatchada Hech nma yoq</h2>
              <Link href={"/"}>
                <button className=" cursor-pointer  mx-auto text-2xl font-bold  mt-5 p-2 border-2 rounded-2xl w-46 border-blue-400">
                  Xarid Qilish
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Savatcha;
