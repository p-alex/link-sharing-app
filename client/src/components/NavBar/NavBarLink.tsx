import { NavLink, NavLinkProps } from "react-router-dom";

interface Props extends NavLinkProps {
  icon: React.ReactNode;
  children: string;
}

const NavBarLink = ({ icon, children, ...navLinkProps }: Props) => {
  return (
    <NavLink
      {...navLinkProps}
      className={({ isActive }) =>
        `text-grey hover:bg-lightPurple flex items-center ${
          isActive ? "bg-lightPurple text-primary" : ""
        } justify-center gap-2 rounded-lg px-7 py-3 font-semibold transition-colors hover:text-primary`
      }
    >
      {icon} <span className="block max-[800px]:hidden">{children}</span>
    </NavLink>
  );
};

export default NavBarLink;
