import { minusCount, plusCount, removeCart } from "@/store/slices/cart.slice";
import { RootState } from "@/store/types";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Remove from "../icons/remove";
import Tavsiya from "../layout/Tavsiya";

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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <>
      <div
        className="fixed  flex-col overflow-y-auto h-[1000px]   gap-5  z-20 inset-0  bg-opacity-75 bg-black/90 flex py-2 items-center"
        onClick={() => setModal(false)}
      >
        <div
          className="bg-white  p-8 rounded-lg  w-[1500px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex  justify-between mb-5">
            <h2 className="text-3xl font-semibold">Savatcha</h2>
            <p
              className=" text-3xl  font-bold cursor-pointer"
              onClick={() => setModal(false)}
            >
              &times;
            </p>
          </div>
          <div className="text-center flex flex-col">
            {cartItems.length > 0 ? (
              <>
                <div className="flex  gap-10">
                  <div className="w-[1100px] overflow-auto h-[330px]">
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
                          <p className="text-xl w-44 text-start">{item.name}</p>
                        </div>

                        <div className="flex gap-5 items-center bg-slate-200 rounded-xl p-2">
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              dispatch(minusCount(item.id));
                            }}
                          >
                            —
                          </button>
                          <p className="text-xl">{item.count}</p>
                          <button
                            className="cursor-pointer text-2xl"
                            onClick={() => {
                              dispatch(plusCount(item.id));
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div className="flex w-60 text-end justify-end gap-2 items-center">
                          <p className="text-lg font-bold font-mono">
                            {(item.count * item.price).toLocaleString("ru")}{" "}
                            So`m
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
                  </div>
                  <div className="flex flex-col ">
                    <div className="border h-48 border-slate-400 rounded-xl p-4 w-96">
                      <div className="bg-slate-200 rounded-xl p-1 flex gap-2">
                        <button className="w-full cursor-pointer bg-white rounded-xl">
                          Hoziroq Tanlash
                        </button>
                        <button className="w-full cursor-pointer  rounded-xl">
                          Muddatli Tolov
                        </button>
                      </div>
                      <div className="flex my-6 justify-between items-center ">
                        <p>{cartItems.length}ta Maxsulot Narxi</p>
                        <p>
                          <span className="font-bold">
                            {totalPrice.toLocaleString("ru")}
                          </span>{" "}
                          som{" "}
                        </p>
                      </div>
                      <div className="flex font-bold text-xl justify-between items-center ">
                        <p>Jami:</p>
                        <p>{totalPrice.toLocaleString("ru")} som </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setModal(false)}
                      className="cursor-pointer bg-blue-500 text-white rounded-2xl p-3 text-2xl mt-5"
                    >
                      Rasmiylashtirish
                    </button>
                  </div>
                </div>

                {/* <div className="text-end">
                <p className="text-2xl  ">
                  Jami Narxi :{" "}
                  <span className="font-bold">
                    {" "}
                    {totalPrice.toLocaleString("ru")} So`m
                  </span>
                </p>
                <button
                  onClick={() => setModal(false)}
                  className="bg-blue-500 text-white p-2 rounded-2xl w-66 mt-3 cursor-pointer"
                >
                  Harid Qilish
                </button>
              </div> */}
              </>
            ) : (
              <div className="text-center flex flex-col">
                <h2 className="text-2xl font-bold">Savatchada Hech nma yoq</h2>

                <button
                  onClick={() => setModal(false)}
                  className=" cursor-pointer  mx-auto text-2xl font-bold  mt-5 p-2 border-2 rounded-2xl w-46 border-blue-400"
                >
                  Xarid Qilish
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-8 rounded-lg w-[1500px] flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-4">Tavsiya etamiz</h2>
          <div className="h-[220px] overflow-y-auto">
            <Tavsiya />
          </div>
        </div>
      </div>
    </>
  );
};

export default Savatcha;
