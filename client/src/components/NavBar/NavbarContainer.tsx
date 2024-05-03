import React from "react";

interface Props {
  children: React.ReactNode;
}

function NavbarContainer({ children }: Props) {
  return (
    <nav className="relative z-50 my-6 flex w-full items-center justify-between rounded-lg bg-white px-6 py-4 max-[800px]:mt-0 max-[800px]:rounded-none max-[800px]:px-4">
      {children}
    </nav>
  );
}

export default NavbarContainer;
