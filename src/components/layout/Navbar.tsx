import Link from "next/link";
import Katalog from "./Katalog";
import UserIcon from "../icons/User";
import Like from "../icons/Like";
import Shop from "../icons/Shop";
function Navbar() {
  return (
    //     <nav>
    //     <Link href={"/"}>Logo</Link>
    //     <Link href={"/about"}>About</Link>
    //   </nav>

    <>
      <div className="bg-slate-200">
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
            <div className=" flex flex-col items-center">
              <Like />
              <p>Sevimlilar</p>
            </div>
            <div className=" flex flex-col items-center">
              <Shop />
              <p>Savatcha</p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
