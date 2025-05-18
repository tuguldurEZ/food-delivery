"use client";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import OrderCart from "./OrderCart";
import { useEffect, useState } from "react";

const Header = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUserId(user);
  }, []);
  const formSchema = z.object({
    address: z.string().min(2, {
      message: "Address must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const router = useRouter();

  const signOutHandler = () => {
    localStorage.clear();
    router.push("/auth/sign-in");
  };

  return (
    <div>
      <div className="w-full bg-[#18181B] h-[68px] flex  items-center justify-between py-3 px-[88px]">
        <div className="flex gap-3">
          <img src="/logo.svg" alt="" className="w-[46px] h-[37.29px]" />
          <div>
            <div className="flex items-center text-[20px] font-bold ">
              <p className="text-[#FAFAFA]  tracking-[-0.5px] ">Nom</p>
              <p className="text-[#EF4444] tracking-[-0.5px]">Nom</p>
            </div>
            <p className="text-[12px] text-[#f4f4f5]">Swift delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {userId ? (
            <Dialog>
              <DialogTrigger>
                <div className="flex gap-2 items-center bg-[#FFFFFF] py-2 px-3 rounded-full">
                  <MapPin color="#EF4444" />
                  <p className="text-[#EF4444] text-[12px]">
                    Delivery address:
                  </p>
                  <p className="text-[#71717A] text-[12px]">Add Location</p>
                  <ChevronRight color="gray" />
                </div>
              </DialogTrigger>
              <DialogContent className="w-[480px]">
                <DialogHeader>
                  <DialogTitle>Delivery address</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Please provide specific address details such as building number, entrance, and apartment number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4 justify-end">
                      <Button className="bg-[#FFF] text-black">Cancel</Button>
                      <Button type="submit">Deliver Here</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          ) : (
            ""
          )}
          {userId ? (
            <Sheet>
              <SheetTrigger>
                <div className="w-[36px] h-[36px] bg-[#f4f4f5] rounded-[50%] flex justify-center items-center">
                  <ShoppingCart color="black" className="w-[13px] h-[13px]" />
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex gap-3 text-background">
                    <ShoppingCart />
                    Order detail
                  </SheetTitle>
                  <Tabs defaultValue="account">
                    <TabsList className="w-[100%] rounded-full">
                      <TabsTrigger
                        value="cart"
                        className="w-[50%] rounded-full"
                      >
                        Cart
                      </TabsTrigger>
                      <TabsTrigger
                        value="order"
                        className="w-[50%] rounded-full"
                      >
                        Order
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="cart" className="text-background">
                      <div className="w-[439px] h-[508px] p-4 rounded-[20px] ">
                        <OrderCart />
                      </div>
                    </TabsContent>
                    <TabsContent value="order" className="text-background">
                      Change your password here.
                    </TabsContent>
                  </Tabs>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ) : (
            ""
          )}

          {userId ? (
            <Popover>
              <PopoverTrigger>
                <div className="w-[36px] h-[36px] bg-[#EF4444] rounded-[50%] flex justify-center items-center">
                  <User color="white" className="w-[13px] h-[13px]" />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-2 p-4 rounded-xl flex-col justify-center items-center">
                  <p className="font-bold text-[20px] tracking-[-0.5px]">
                    {/* {user?.email} */}
                  </p>
                  <Button variant="secondary" onClick={signOutHandler}>
                    sign out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-[13px] items-center">
              <Button
                onClick={() => router.push("/auth/sign-up")}
                className="h-[36px] py-2 px-[12px] rounded-full bg-white text-black"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => router.push("/auth/sign-in")}
                className="h-[36px] py-2 px-[12px] rounded-full bg-red-500 text-white"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
