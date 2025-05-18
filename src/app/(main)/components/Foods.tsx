"use client";
import { useCategory } from "@/app/_context/CategoryContext";
import { useFood } from "@/app/_context/FoodContext";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
const Foods = () => {
  const { categories } = useCategory();
  const { foods } = useFood();
  const [count, setCount] = useState(1);

  const plusHandler = () => {
    setCount(count + 1);
  };

  const minusHandler = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return (
    <div>
      {categories.slice(0, 4).map((category) => {
        return (
          <div key={category._id} className="mb-[52px] w-[80vw] m-auto">
            <p className=" text-white text-[30px] font-bold tracking-[-0.75px] mb-[52px] mt-[40px]">
              {category.categoryName}
            </p>
            <div className="flex gap-5 flex-wrap ">
              {foods
                .filter((food) => category?._id === food.category?._id)
                .map((filteredFood) => {
                  return (
                    <div
                      key={filteredFood._id}
                      className="w-[397px] h-[342px] rounded-[20px] bg-[#FFFFFF] p-4 "
                    >
                      <div
                        style={{
                          backgroundImage: `url(${filteredFood.image})`,
                        }}
                        className="bg-cover bg-center w-[365px] h-[210px] rounded-xl relative"
                      >
                        <Dialog>
                          <DialogTrigger>
                            <div className="w-[44px] h-[44px] py-2 px-4 justify-center items-center text-red-500 rounded-full bg-[#FFF] absolute bottom-5 right-5">
                              +
                            </div>
                          </DialogTrigger>
                          <DialogContent className="w-[90vw] max-w-none">
                            <DialogHeader>
                              <DialogTitle className="text-red-500 text-xl font-bold"></DialogTitle>
                              <div className="text-sm text-muted-foreground flex gap-6">
                                <img
                                  src={filteredFood.image}
                                  className="w-[377px] h-[364px] rounded-xl"
                                />
                                <div className="flex flex-col justify-between">
                                  <div className="flex flex-col gap-3">
                                    <div className="text-red-500 text-lg font-bold">
                                      {filteredFood.foodName}
                                    </div>
                                    <p className="text-sm">
                                      {filteredFood.ingredients}
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <p className="text-[16px] text-[#09090B]">
                                          Total Price
                                        </p>
                                        <p className="text-[24px] font-bold tracking-[-0.6px] text-[#09090B]">
                                          ${filteredFood.price * count}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Button
                                          className="w-[44px] h-[44px] rounded-full py-2 px-4 flex items-center justify-center border-[1px] border-solid border-[#E4E4E7] bg-background text-black"
                                          onClick={minusHandler}
                                        >
                                          -
                                        </Button>
                                        <p className="text-[#09090B] text-[18px] font-bold">
                                          {count}
                                        </p>
                                        <Button
                                          className="w-[44px] h-[44px] rounded-full py-2 px-4 flex items-center justify-center border-[1px] border-solid border-[#E4E4E7] bg-background text-black"
                                          onClick={plusHandler}
                                        >
                                          +
                                        </Button>
                                      </div>
                                    </div>
                                    <Button className="w-full">
                                      Add to cart
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <p className="text-red-500 text-[24px] font-bold tracking-[-0.6px] ">
                            {filteredFood.foodName}
                          </p>
                          <p className="text-[#09090B] text-[18px] font-bold ">
                            ${filteredFood.price}
                          </p>
                        </div>
                        <p className="text-[14px]">
                          {filteredFood.ingredients}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Foods;
