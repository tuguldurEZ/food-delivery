import React from "react";

const OrderCart = () => {
  const checkoutHandler = () => {
    alert("amjilttai zahiallaa");
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="w-[471px]  bg-white rounded-[20px] p-4 flex flex-col gap-4">
        <h4 className="text-[20px] font-bold text-[#09090B]">My cart</h4>
        {/* {basket.map((food) => {
          return (
            <div className="flex flex-col gap-[20px]" key={food.food._id}>
              <div className="flex gap-[10px]">
                <img
                  src={food.food.image}
                  alt=""
                  className="w-[120px] h-[100px] rounded-xl object-cover"
                />
                <div className="text-black flex gap-[10px] ">
                  <div>
                    <p className="text-[16px] text-[#EF4444] font-bold">
                      {food.food.foodName}
                    </p>
                    <p className="text-[12px] text-[#09090B]">
                      {food.food.ingredients}
                    </p>
                  </div>
                  <div className="w-[36px] h-[36px] rounded-full border-[1px] border-red-500 border-solid px-4 py-2 flex justify-center items-center text-red-500">
                    X
                  </div>
                </div>
              </div>
              <div className="border-dotted border-[1px] border-[#09090B80]"></div>
            </div>
          );
        })} */}
        <div className="w-[439px] h-[44px] rounded-full flex justify-center items-center border-[1px] border-solid border-red-500">
          <p className="font-bold text-[#EF4444] text-[14px]">Add Foods</p>
        </div>
      </div>
      <div className="w-[471px] h-[276px] rounded-[20px] p-4 flex flex-col gap-5 bg-white text-black">
        <h4 className="text-[20px] font-bold">Payment info</h4>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-[16px] text-[#71717A]  flex justify-between">
              Items
            </p>
            <p></p>
          </div>
          <div className="flex justify-between">
            <p className="text-[16px] text-[#71717A] ">Shipping</p>
            <p>0.99$</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[16px] text-[#71717A]">Total</p>
            <p>13.98$</p>
          </div>
        </div>
        <div className="w-[439px] h-[44px] rounded-full flex justify-center items-center bg-red-500">
          <button
            className="font-bold text-white text-[14px]"
            onClick={checkoutHandler}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCart;
