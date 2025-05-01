import React from "react";
import Lokation from "../../components/icons/location-01-stroke-rounded";
import MeningKartam from "../../components/icons/MeningKartam";
import Qongiroq from "../../components/icons/qongiroq";
import { useSelector } from "react-redux";
import { RootState } from "@/store/types";

function MyAccount({ isClient }: { isClient: boolean }) {
  const name = useSelector((state: RootState) => state.auth.user?.name);

  return (
    <>
      <div className="w-[460px] h-52 border border-gray-300 rounded-xl">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="rounded-full flex justify-center pt-2 bg-slate-200 w-12 h-12">
              {isClient && <p className="text-xl">{name?.slice(0, 1)}</p>}
            </div>
            <p>Shaxsiy Malumotlar</p>
          </div>
          <button className="p-1 rounded-lg px-2 border border-gray-400">
            O`zgartirish
          </button>
        </div>
        <hr />

        <div className="p-4">
          <p className="font-bold">{name}</p>
          <p className="mt-4">
            <span className="opacity-35">Telefon : </span>
            +998944085444{" "}
          </p>
        </div>
      </div>
      <div className="w-[460px] h-52 border border-gray-300 rounded-xl">
        <div className="p-3">
          <div className="flex items-center gap-5">
            <div className="rounded-full flex justify-center pt-3 bg-slate-200 w-12 h-12">
              <Qongiroq />
            </div>
            <p>Xabarlar yoki Yangiliklar</p>
          </div>
        </div>
        <hr />

        <div className="p-4">
          <p className="font-bold">
            Aksiyalar va chegirmalar xaqida malumot olish
          </p>
          <div className="pt-3 flex gap-8">
            {" "}
            <p>Sms Orqali </p>
            <p>Telegram Orqali</p>
          </div>
        </div>
      </div>
      <div className="w-[460px] h-52 border border-gray-300 rounded-xl">
        <div className="p-3 ">
          <div className="flex items-center gap-5">
            <div className="rounded-full flex justify-center pt-3 bg-slate-200 w-12 h-12">
              <MeningKartam />
            </div>
            <p>Mening Kartam</p>
          </div>
        </div>
        <hr />

        <div className="p-4">
          <p>Mavjud Emas</p>
        </div>
      </div>
      <div className="w-[460px] h-52 border border-gray-300 rounded-xl">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="rounded-full flex justify-center pt-3 bg-slate-200 w-12 h-12">
              <Lokation />
            </div>
            <p>Yetkazib Berish Manzili</p>
          </div>
          <button className="p-1 rounded-lg px-2 border border-gray-400">
            Qo`shish
          </button>
        </div>
        <hr />

        <div className="p-4">
          <p>Manzil Qo`shilmagan</p>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
