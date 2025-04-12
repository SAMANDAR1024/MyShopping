import { removeCart } from "@/store/slices/cart.slice";
import { RootState } from "@/store/types";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
        className="bg-white p-8 rounded-lg  w-[1300px]"
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
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-2"
                >
                  <span>{item.name}</span>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-500"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
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
