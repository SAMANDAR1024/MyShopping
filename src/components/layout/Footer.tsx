// import telegram from "../../assets/icons/telegram.svg";
// import instagram from "../../assets/icons/instagram.svg";
// import yotube from "../../assets/icons/yotube.svg";

function Footer() {
  return (
    <div className="bg-slate-200 p-4 ">
      <div className=" container m-auto px-12  flex   justify-between pb-12">
        <div className=" flex flex-col gap-4">
          <p className=" ">Savolingiz bormi? Telefon qiling</p>
          <a
            href="+998944085444"
            className=" hover:text-blue-300 text-3xl font-bold"
          >
            +998 94 408 54 44
          </a>{" "}
          <div className=" flex p-2 gap-3">
            {/* <Image width={40} height={40} src={telegram} alt="telegram" />
            <Image width={40} height={40} src={instagram} alt="instagram" />
            <Image width={40} height={40} src={yotube} alt="youtube" /> */}
          </div>
          <p className=" font-semibold underline">Do`konlar manzillari</p>
        </div>
        <div className=" flex flex-col gap-3">
          <h2 className=" font-semibold text-2xl">Kompaniya</h2>
          <p>Yuridik shaxslar uchun</p>
          <p>Biz haqimizda</p>
          <p>Yangiliklar va bloglar</p>
          <p>IMEI ni tekshirish</p>
        </div>
        <div className=" flex flex-col gap-3">
          <h2 className=" font-semibold text-2xl">Malumot</h2>
          <p>Bepul yetkazib berish</p>
          <p>Texnomartda ishlash</p>
          <p>Shaxsiy kabinet</p>
          <p>Aloqa raqamlari</p>
        </div>
        <div className=" flex flex-col gap-3">
          <h2 className=" text-2xl font-semibold">Haridorga yordam</h2>
          <p>Maxsulotni qaytarish</p>
          <p>Mahsulotlar uchun kafolat</p>
        </div>
        <div>
          <h2>Ilovani yuklab olish</h2>
        </div>
      </div>
    </div>
  );
}

export default Footer;
