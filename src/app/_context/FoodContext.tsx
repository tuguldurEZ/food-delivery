"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FoodType } from "../util/types";

type CategoryContextType = {
  foods: FoodType[];
  getData: () => void;
};

const FoodContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const useFood = () => {
  return useContext(FoodContext);
};

const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const getData = async () => {
    const res = await fetch(`/api/food/fetch-all-food`);
    const data = await res.json();
    setFoods(data.getFoods);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, getData }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;
