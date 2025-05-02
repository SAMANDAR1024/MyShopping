import {
  fullRemove,
  minusCount,
  plusCount,
  removeCart,
} from "@/store/slices/cart.slice";
import { RootState } from "@/store/types";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Remove from "../icons/remove";
import Tavsiya from "../layout/Tavsiya";
import { useRouter } from "next/router";

export type Savat = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Savatcha: React.FC<Savat> = ({ modal, setModal }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  console.log(token);
const router= useRouter()
  const dispatch = useDispatch();

  const remove = (id: number) => {
    dispatch(removeCart(id));
  };

  const fulRemove = () => {
    dispatch(fullRemove());
  };

  const AxiosOrders = () => {
    if (!address.trim()) {
      alert("Manzilni kiriting!");
      return;
    }
    console.log("Token:", token);
    if (!token) {
      alert("Avval login bo‘ling");
      return;
    }

    setIsLoading(true);
    axios
      .post(
        "https://nt.softly.uz/api/front/orders",
        {
          address: address,
          items: cartItems
            .filter((item) => item.count > 0)
            .map((item) => ({
              productId: item.id,
              quantity: item.count,
            })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Buyurtma jo‘natildi:", res.data);
        toast.success("Buyurtma jo‘natildi");
        fulRemove();
        router.push("/login")
      })
      .catch(() => {
        toast.error("Maxsulot Qolmagan Sal Keyinroq Urinib Korin!!!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!modal) return null;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  console.log(
    cartItems.map((item) => ({
      productId: item.id,
      quantity: item.count,
    }))
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
                    <div className="border h-60 border-slate-400 rounded-xl p-4 w-96">
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
                      <input
                        placeholder="Manzil Kiriting Toliq holatda"
                        className="border-1 border-[lightgrey] outline-none p-2  my-4 w-full rounded-lg"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        type="text"
                      />
                    </div>

                    
                    <button
                      disabled={isLoading}
                      onClick={() => {
                        AxiosOrders();
                        setModal(false)
                      }}
                      className="cursor-pointer bg-blue-500 text-white rounded-2xl p-3 text-2xl mt-5"
                    >
                      {isLoading ? "Yuklanmoqda" : "Rasmiylashtirish"}
                    </button>
                  </div>
                </div>
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
