import Image from "next/image";
import React, { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";
type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-between items-center">
        <div className="w-full flex justify-center">{props.children}</div>

        <Image
          src="https://res.cloudinary.com/dhvtog3m2/image/upload/v1739929023/Frame_1321316047_jns29o.png"
          alt=""
          width={0}
          height={0}
          className="rounded-[16px]"
          sizes="100vw"
          style={{ width: "auto", height: "100vh", padding: "10px" }}
        />
      </div>
      <Toaster />
    </Suspense>
  );
};

export default Authlayout;
