import React from "react";

interface Props {
  navbar: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ navbar, children }: Props) => {
  return (
    <div className={`mx-auto max-w-[1352px]`}>
      {navbar}
      <main className={"mx-auto max-[1376px]:mx-6"}>{children}</main>
    </div>
  );
};

export default Layout;
