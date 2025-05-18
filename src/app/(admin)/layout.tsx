"use client";
import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import { Toaster } from "sonner";

type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  // if (!user) {
  //   return <div>Burtguulne uu</div>;
  // } else if (user.role == "ADMIN") {
  return (
    <div className="flex">
      <Sidebar />
      {props.children}
      <Toaster />
    </div>
  );
  // }
};

export default Authlayout;
