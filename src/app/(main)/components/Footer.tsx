import { Instagram } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-[755px] bg-[#18181B] flex flex-col justify-around items-center">
      <div className="w-full py-7 px-[98px] flex gap-[34px] bg-[#EF4444] items-center text-[30px] font-bold tracking-[-0.75px] text-[#FAFAFA]">
        <p>Fresh fast delivered </p>
        <p>Fresh fast delivered </p>
        <p>Fresh fast delivered </p>
        <p>Fresh fast delivered </p>
        <p>Fresh fast delivered </p>
      </div>
      <div className="flex gap-[220px]">
        <div>
          <div className="flex flex-col gap-3">
            <img src="/logo.svg" alt="" className="w-[46px] h-[37.29px]" />
            <div>
              <div className="flex items-center text-[20px] font-bold ">
                <p className="text-[#FAFAFA]  tracking-[-0.5px] ">Nom</p>
                <p className="text-[#EF4444] tracking-[-0.5px]">Nom</p>
              </div>
              <p className="text-[12px] text-[#f4f4f5]">Swift delivery</p>
            </div>
          </div>
        </div>
        <div className="flex gap-[120px]">
          <div className="text-[#FAFAFA] gap-4">
            <p className="text-[16px] text-[#71717A] ">NOMNOM</p>
            <p>Home</p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          <div className="text-[#FAFAFA] gap-4">
            <p className="text-[16px] text-[#71717A] ">NOMNOM</p>
            <p>Appetizers</p>
            <p>Salads</p>
            <p>Pizzas</p>
            <p>Main dishess</p>
            <p>Desserts</p>
          </div>
          <div className="text-[#FAFAFA] gap-4">
            <p className="text-[16px] text-[#71717A] "></p>
            <p>Side dish </p>
            <p>Brunch</p>
            <p>Desserts</p>
            <p>Beverages</p>
            <p>Fish & Sea foods</p>
          </div>
          <div className="gap-4">
            <p className="text-[16px] text-[#71717A] ">FOLLOW US</p>
            <Instagram color="#ffffff" className="w-[28px] h-[28px]" />
          </div>
        </div>
      </div>
      <div className="w-[1264px] py-8 px-[32px] flex items-center gap-12 border-t-[1px] border-solid border-gray-900 text-[14px] text-[#71717A]">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};

export default Footer;
