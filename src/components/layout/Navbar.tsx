import Link from "next/link";
import Katalog from "./Katalog";
import Like from "../icons/Like";
import Shop from "../icons/Shop";
import { useState } from "react";
import Savatcha from "../Modal/Savatcha";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import dynamic from "next/dynamic";
const LoginDialog = dynamic(() => import("../Modal/LoginModal"), {
  ssr: false,
});
function Navbar() {
  const [modal, setModal] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const likeCount = useSelector(
    (state: RootState) => state.likeCart.items.length
  );

  return (
    <div className="bg-slate-200">
      <Savatcha modal={modal} setModal={setModal} />

      <nav className="w-full max-w-[1400px] mx-auto px-10 md:px-8 py-4 flex flex-wrap gap-y-4 gap-x-5 items-center justify-between">
        {/* Logo */}
        <div>
          {" "}
          <Link className="text-xl md:text-2xl font-bold" href={"/"}>
            SAMANDAR.SHOP
          </Link>
        </div>

        {/* Search & Katalog */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 sm:flex-initial">
          <Katalog />
          <input
            className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] p-2 rounded-xl border-2 border-amber-500"
            type="text"
            placeholder="Qidirish"
          />
        </div>

        {/* Icons */}
        <div className="flex gap-4 sm:gap-6 md:gap-10">
          <LoginDialog />

          <Link
            href={"/liked"}
            className="relative flex flex-col items-center text-xs sm:text-sm"
          >
            <Like />
            {likeCount > 0 && (
              <span className="absolute -top-2 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {likeCount}
              </span>
            )}
            <p>Sevimlilar</p>
          </Link>

          <div
            onClick={() => setModal(true)}
            className="relative cursor-pointer flex flex-col items-center text-xs sm:text-sm"
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
  );
}

export default Navbar;
