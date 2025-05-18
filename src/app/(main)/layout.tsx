import React, { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Authlayout;
