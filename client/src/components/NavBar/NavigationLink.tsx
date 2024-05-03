import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  children: string;
  icon?: React.ReactNode;
}

function NavigationLink({ to, children, icon }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive ? "bg-lightPurple text-primary" : ""
        } flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-mediumGrey transition-colors hover:text-primary max-[800px]:px-3`
      }
      title="links"
    >
      {icon && icon}
      <span className="block max-sm:hidden">{children}</span>
    </NavLink>
  );
}

export default NavigationLink;
