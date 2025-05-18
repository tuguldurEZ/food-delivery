import { Truck } from "lucide-react";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-[205px] py-5 px-[20px] flex flex-col h-[100vh] gap-10 bg-[#ffffff]">
      <Link href="/">
        <div className="flex  gap-3">
          <img src="/logo.svg" alt="" className="w-[46px] h-[37.29px]" />
          <div>
            <div className="flex items-center ">
              <p className="text-[#09090B] text-[18px] font-bold tracking-[-0.5px] ">
                NomNom
              </p>
            </div>
            <p className="text-[12px] text-[#71717A]">Swift delivery</p>
          </div>
        </div>
      </Link>

      <ToggleGroup type="single" className="flex flex-col items-start gap-6">
        <Link href="foodMenu">
          <ToggleGroupItem
            value="a"
            className="flex gap-[10px] items-center px-5 py-2 w-full"
          >
            <img
              src="/adminFOodMenu.svg"
              alt=""
              className="w-[22px] h-[22px]"
            />
            <p className=" text-[14px] font-bold">Food menu</p>
          </ToggleGroupItem>
        </Link>
        <Link href="orders">
          <ToggleGroupItem
            value="b"
            className="flex gap-[10px] items-center px-6 py-2 w-full"
          >
            <Truck />
            <p className=" text-[14px] font-bold w-[70px]">Orders</p>
          </ToggleGroupItem>
        </Link>
        <ToggleGroupItem
          value="c"
          className="flex gap-[10px] items-center px-6 py-2 w-full"
        >
          <img src="/settings.svg" alt="" className="w-[22px] h-[22px]" />
          <p className=" text-[14px] font-bold">Settings</p>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default Sidebar;
