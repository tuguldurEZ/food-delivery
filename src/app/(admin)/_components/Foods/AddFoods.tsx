"use client";

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryType } from "@/app/util/types";
import { useFood } from "@/app/_context/FoodContext";
import { deleteFood } from "@/lib/food/delete-food";
import { editFood } from "@/lib/food/edit-food";
import FoodsDialog from "./FoodsDialog";

const Foods = ({ categories }: { categories: CategoryType[] }) => {
  const [foodId, setFoodId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { foods, getData } = useFood();

  const FormSchema = z.object({
    foodName: z.string().min(2, {
      message: "ner 2usegnees deesh baina",
    }),
    foodPrice: z.string().min(1, {
      message: "une 1ees ih baina",
    }),
    Ingredients: z.string().min(5, {
      message: "tailbat dor hayj 5useg",
    }),
    category: z.string().min(1, {
      message: "Please select a category",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      foodName: "",
      foodPrice: "",
      Ingredients: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      await editFood(
        values.Ingredients,
        values.foodName,
        values.foodPrice,
        values.category,
        foodId
      );
      await getData();
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const deleteHandler = async (id: string) => {
    try {
      console.log("iddd", id);
      await deleteFood(id);
      await getData();
      setDialogOpen(false);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex gap-4 flex-col mt-5">
      {categories?.map((category) => (
        <div
          key={category._id}
          className="p-5 bg-xl bg-[#fff] rounded-xl mt-5 flex flex-col gap-4"
        >
          <p className="text-black text-[20px] tracking-[-0.5] font-bold">
            {category.categoryName}
          </p>
          <div className="flex flex-wrap gap-4">
            <FoodsDialog getData={getData} id={category._id} />
            {foods
              .filter((food) => food.category?._id === category._id)
              .map((filteredFood) => (
                <div
                  key={filteredFood._id}
                  className="flex flex-col gap-5 p-4 rounded-[20px] border-solid border-[1px] border-[#E4E4E7] bg-[#FFF] w-[270px]"
                >
                  <div className="relative">
                    <img
                      src={filteredFood.image}
                      alt=""
                      className="rounded-xl w-[100%] h-[129px] object-cover"
                    />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger
                        className="w-11 h-11 py-2 px-4 flex justify-center items-center absolute bottom-4 right-4 bg-white rounded-full"
                        onClick={() => {
                          form.setValue("foodName", filteredFood.foodName);
                          form.setValue(
                            "foodPrice",
                            String(filteredFood.price)
                          );
                          form.setValue(
                            "Ingredients",
                            filteredFood.ingredients
                          );
                          form.setValue("category", filteredFood.category._id);
                          setFoodId(filteredFood._id);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil color="#ff0000" width={16} height={16} />
                      </DialogTrigger>

                      <DialogContent className="w-[472px] p-6">
                        <DialogHeader>
                          <DialogTitle>Dishes info</DialogTitle>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                              <div className="flex flex-col gap-3">
                                {/* Food Name */}
                                <div className="flex justify-between mt-3">
                                  <p className="text-[#71717A] text-[12px]">
                                    Food Name
                                  </p>
                                  <FormField
                                    control={form.control}
                                    name="foodName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            placeholder="Food Name"
                                            {...field}
                                            className="w-[288px]"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                {/* Category */}
                                <div className="flex justify-between mt-3">
                                  <p className="text-[#71717A] text-[12px]">
                                    Dish Category
                                  </p>
                                  <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                      <FormItem>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <SelectTrigger className="w-[288px]">
                                            <SelectValue placeholder="Choose Category" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {categories?.map((category) => (
                                              <SelectItem
                                                key={category._id}
                                                value={category._id}
                                              >
                                                {category.categoryName}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="flex justify-between mt-3">
                                  <p className="text-[#71717A] text-[12px]">
                                    Ingredients
                                  </p>
                                  <FormField
                                    control={form.control}
                                    name="Ingredients"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            placeholder="tailbar"
                                            {...field}
                                            className="w-[288px] min-h-[80px]"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="flex justify-between mt-3">
                                  <p className="text-[#71717A] text-[12px]">
                                    Price
                                  </p>
                                  <FormField
                                    control={form.control}
                                    name="foodPrice"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="Food Price"
                                            {...field}
                                            className="w-[288px]"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="flex justify-between pt-6 items-center">
                                  <DialogClose asChild>
                                    <Button
                                      className="h-[40px] py-2 px-4 bg-transparent border-[1px] border-solid border-[#EF4444]"
                                      onClick={() =>
                                        deleteHandler(filteredFood._id)
                                      }
                                    >
                                      <Trash2
                                        color="#ff0000"
                                        width={16}
                                        height={16}
                                      />
                                    </Button>
                                  </DialogClose>

                                  <Button
                                    type="submit"
                                    className="h-[40px] py-2 px-4"
                                    disabled={loading}
                                  >
                                    {loading ? "loading..." : "Save changes"}
                                  </Button>
                                </div>
                              </div>
                            </form>
                          </Form>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="text-bold text-[14px] text-[#EF4444]">
                        {filteredFood.foodName}
                      </p>
                      <p className="text-[12px] text-[#09090B]">
                        {filteredFood.price}
                      </p>
                    </div>
                    <p className="text-[12px] text-[#09090B]">
                      {filteredFood.ingredients}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Foods;
