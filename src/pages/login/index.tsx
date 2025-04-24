import UserIcon from "@/components/icons/User";
import { RootState } from "@/store/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Exit from "../../components/icons/exit";
import Lokation from "../../components/icons/location-01-stroke-rounded";
import MeningKartam from "../../components/icons/MeningKartam";
import OnlineBuyurtmalar from "../../components/icons/onlayn";
import Qongiroq from "../../components/icons/qongiroq";
import Strelka from "../../components/icons/strelka";
import TolovTarixi from "../../components/icons/Tarixi";
import Tolovlarim from "../../components/icons/tolovlarim";
import MyOrders from "@/components/layout/MyOrders";

export default function Login() {
  const name = useSelector((state: RootState) => state.auth.user?.name);
  const email = useSelector((state: RootState) => state.auth.user?.email);
  const [activeTab, setActiveTab] = useState("profile");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <>
      <div className="container m-auto px-16">
        <div className="flex gap-2 my-5 items-center">
          <Strelka />
          <Link href={"/"}>
            <button className="text-sm p-1 rounded-xl px-5 cursor-pointer bg-slate-200">
              Bosh Saxifa
            </button>
          </Link>
          <button className="text-sm text-white p-1 rounded-xl px-5 cursor-pointer bg-yellow-500 ">
            Profil
          </button>
        </div>

        <div className="flex  gap-7 ">
          <div className="flex my-2">
            <div className="w-96 flex flex-col ">
              <div
                onClick={() => setActiveTab("profile")}
                className="flex mb-7 items-center gap-4"
              >
                <div className="rounded-full flex justify-center pt-3 bg-slate-200 w-12 h-12">
                  <UserIcon />
                </div>
                <div suppressContentEditableWarning={true}>
                  {isClient && (
                    <div className="flex flex-col ">
                      <p>{name}</p>
                      <p>{email}</p>
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <div className="mt-7 flex flex-col gap-2">
                <div className="flex transition transform hover:-translate-y-1  duration-200  hover:shadow-md hover:bg-white p-2 cursor-pointer gap-6 items-center">
                  <div className="rounded-full flex justify-center pt-3 bg-slate-200 w-12 h-12">
                    <Tolovlarim />
                  </div>
                  <p className="transiton transform hover:pl-5 duration-200">
                    Mening Tolovlarim
                  </p>
                </div>
                <div className="flex transition transform hover:-translate-y-1  duration-200  hover:shadow-md hover:bg-white p-2 cursor-pointer gap-6 items-center">
                  <div className="rounded-full flex justify-center pt-3 bg-slate-200 w-12 h-12">
                    <TolovTarixi />
                  </div>
                  <p className="transiton transform hover:pl-5 duration-200">
                    Tolov Tarixi
                  </p>
                </div>
                <div
                  onClick={() => setActiveTab("orders")}
                  className="flex transition transform hover:-translate-y-1  duration-200  hover:shadow-md hover:bg-white p-2 cursor-pointer gap-6 items-center"
                >
                  <div className="rounded-full flex justify-center pt-3 bg-slate-200 w-12 h-12">
                    <OnlineBuyurtmalar />
                  </div>
                  <p className="transiton transform hover:pl-5 duration-200">
                    Onlayn Buyurtmalar
                  </p>
                </div>
                <Link
                  href={"/"}
                  className="flex transition transform hover:-translate-y-1  duration-200  hover:shadow-md hover:bg-white p-2 cursor-pointer gap-6 items-center"
                >
                  <div className="rounded-full flex justify-center pt-3 bg-slate-200 w-12 h-12">
                    <Exit />
                  </div>
                  <p className="transiton transform hover:pl-5 duration-200">
                    chiqish
                  </p>
                </Link>
              </div>
            </div>
            <div className="w-[1px] opacity-30 h-full bg-gray-500"></div>
          </div>

          <div className="flex flex-wrap gap-5">
            {activeTab === "orders" ? (
              <>
                <MyOrders />
              </>
            ) : (
              <>
                <div className="w-[460px] h-52 border border-gray-300 rounded-xl">
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="rounded-full flex justify-center pt-2 bg-slate-200 w-12 h-12">
                        {isClient && (
                          <p className="text-xl">{name?.slice(0, 1)}</p>
                        )}
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
                      <span className="opacity-35">Telefon : </span>+998 94 408
                      54 44
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
