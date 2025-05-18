"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Input } from "@/components/ui/input";

import { CreateCategory } from "@/lib/category/create-category";
import { deleteCategory } from "@/lib/category/delete-category";
import { editCategory } from "@/lib/category/edit-category";
import { useCategory } from "@/app/_context/CategoryContext";
import Foods from "../_components/Foods/AddFoods";

const FormSchema = z.object({
  category: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

const FoodMenuPage = () => {
  const { categories, refreshCategories } = useCategory();
  const [editCategoryName, setEditCategoryName] = useState(false);
  const [isedit, setIsEdit] = useState(false);
  const [saveId, setSaveId] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      if (isedit) {
        await editCategory(saveId, values.category);
      } else {
        await CreateCategory({ category: values.category });
      }
      await refreshCategories();
      setEditCategoryName(false);
      form.reset();
    } catch (err) {
      console.error("Алдаа:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickEdit = (id: string, name: string) => {
    setEditCategoryName(true);
    setIsEdit(true);
    setSaveId(id);
    form.setValue("category", name);
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    await refreshCategories();
  };

  return (
    <div className="bg-[#f4f4f5] w-screen p-6">
      <div className="p-6 w-full m-auto flex flex-col gap-[24px]">
        <div className="flex flex-col bg-white p-5 rounded-xl gap-4">
          <p className="text-[20px] font-bold tracking-[-0.5px]">
            Dishes category
          </p>
          <div className="flex gap-3 items-center flex-wrap">
            {categories.map((category) => (
              <button
                key={category._id}
                className="py-1 px-5 bg-white rounded-full"
              >
                <ContextMenu>
                  <ContextMenuTrigger>
                    {category.categoryName}
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() =>
                        handleClickEdit(category._id, category.categoryName)
                      }
                    >
                      Edit
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => handleDelete(category._id)}>
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </button>
            ))}
            <div
              className="w-[36px] h-[36px] py-2 px-4 flex justify-center items-center bg-[#EF4444] rounded-full text-white"
              onClick={() => {
                setEditCategoryName(true);
                setIsEdit(false);
                form.reset();
              }}
            >
              +
            </div>
            <Dialog
              open={editCategoryName}
              onOpenChange={() => setEditCategoryName(false)}
            >
              <DialogContent className="w-[460px] p-6 rounded-xl">
                <DialogHeader>
                  <DialogTitle>
                    {isedit ? "Edit category" : "Add new category"}
                  </DialogTitle>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-[24px] mt-[24px]">
                            <FormLabel>Category name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="нэмэх утга аа оруулна уу"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={loading}>
                        {loading
                          ? "loading..."
                          : isedit
                          ? "Save Changes"
                          : "Add Category"}
                      </Button>
                    </form>
                  </Form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Foods categories={categories} />
    </div>
  );
};

export default FoodMenuPage;
