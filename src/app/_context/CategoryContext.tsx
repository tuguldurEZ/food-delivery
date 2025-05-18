"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CategoryType } from "@/app/util/types";
import { fetchAllCategory } from "@/lib/category/fetch-all-category";

type CategoryContextType = {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  refreshCategories: () => Promise<void>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const refreshCategories = async () => {
    const data = await fetchAllCategory();
    setCategories(data);
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, setCategories, refreshCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context)
    throw new Error("useCategory must be used within a CategoryProvider");
  return context;
};
