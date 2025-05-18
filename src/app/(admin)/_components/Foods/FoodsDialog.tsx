/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
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
import { Input } from "@/components/ui/input";
import { createFood } from "@/lib/food/create-food";

const FormSchema = z.object({
  img: z.string().nonempty({
    message: "зураг оруулна уу",
  }),
  foodName: z.string().min(2, {
    message: "нэр 2 үсгээс дээш байна",
  }),
  foodPrice: z.string().min(1, {
    message: "үнэ 1-с их байна",
  }),
  Ingredients: z.string().min(5, {
    message: "тайлбар дор хаяж 5 үсэг",
  }),
});

const FoodsDialog = ({ getData, id }: { getData: () => void; id: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const tempImageUrl = URL.createObjectURL(selectedFile);
      setImage(tempImageUrl);
      form.setValue("img", "uploaded");
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      img: "",
      foodName: "",
      foodPrice: "",
      Ingredients: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      await createFood(
        values.foodName,
        values.foodPrice,
        values.Ingredients,
        file,
        id
      );
      setDialogOpen(false);
      getData();
      form.reset();
      setImage("");
      setFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="py-2 px-4 flex flex-col justify-center items-center gap-6 border-dashed border-[1px] border-red-500 rounded-[20px] h-[241px] w-[249px] cursor-pointer">
          <div className="w-[36px] h-[36px] py-2 px-4 flex justify-center items-center bg-[#EF4444] rounded-full text-white">
            +
          </div>
          <p className="text-[14px] font-bold w-[154px] text-center">
            Add new Dish to Appetizers
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[460px] p-6 rounded-xl bg-[#FFF]">
        <DialogTitle>
          <p className="text-[18px] font-bold">Add new Dish to Appetizers</p>
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="foodName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Food Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Food Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Input placeholder="тайлбар" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="img"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Food Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input type="file" onChange={handleFile} {...rest} />
                      {image && (
                        <div className="border p-1 w-48 h-48">
                          <img
                            className="object-cover w-full h-full"
                            src={image}
                            alt="Food image"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FoodsDialog;
