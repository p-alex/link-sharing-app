import React from "react";
import NavBar from "../components/NavBar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-[1352px]">
      <NavBar />
      <main className="mx-auto max-w-[1352px] max-[1376px]:mx-6">{children}</main>
    </div>
  );
};

export default Layout;
