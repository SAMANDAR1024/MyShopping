import Link from "next/link";
import Katalog from "./Katalog";
import UserIcon from "../icons/User";
import Like from "../icons/Like";
import Shop from "../icons/Shop";
import { useState } from "react";
import Savatcha from "../Modal/Savatcha";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
function Navbar() {
  const [modal, setModal] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const likeCount = useSelector(
    (state: RootState) => state.likeCart.items.length
  );
  return (
    //     <nav>
    //     <Link href={"/"}>Logo</Link>
    //     <Link href={"/about"}>About</Link>
    //   </nav>

    <>
      <div className="bg-slate-200">
        <Savatcha modal={modal} setModal={setModal} />
        <nav className="container w-full mx-auto px-16 py-4 flex items-center justify-between gap-8">
          <Link className="text-2xl" href={"/"}>
            SAMANDAR.SHOP
          </Link>

          <div className="flex items-center gap-5">
            <Katalog />
            <input
              className="w-[600px] cursor-pointer p-2 rounded-xl border-2 border-amber-500"
              type="text "
              placeholder="Qidirish"
            />
          </div>
          <div className=" flex gap-10">
            <div className=" flex flex-col items-center">
              <UserIcon />
              <p>Kirish</p>
            </div>
            <Link href={"/liked"} className="relative flex flex-col items-center">
              <Like />
              {likeCount > 0 && (
                <span className="absolute -top-2 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {likeCount}
                </span>
              )}
              <p>Sevimlilar</p>
            </Link>
            <div
              onClick={() => {
                setModal(true);
              }}
              className=" relative cursor-pointer flex flex-col items-center"
            >
              <Shop />
              {cartCount > 0 && (
                <span className="absolute -top-2 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}

              <p>Savatcha</p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
