import { Link, NavLink } from "react-router-dom";
import { EditIcon, LinkIcon } from "../../svgs";
import NavProfile from "./NavProfile";

const NavBar = () => {
  return (
    <nav className="relative my-6 flex w-full items-center justify-between rounded-lg bg-white px-6 py-4 max-[800px]:mt-0 max-[800px]:rounded-none max-[800px]:px-4">
      <Link to="/links" aria-label="devlinks">
        <img
          src="/images/logo-devlinks-large.svg"
          className="block max-[800px]:hidden"
          width={146}
          height={32}
          alt=""
        />
        <img
          src="/images/logo-devlinks-small.svg"
          className="hidden max-[800px]:block"
          width={32}
          height={32}
          alt=""
        />
      </Link>
      <ul className="flex items-center gap-2">
        <li>
          <NavLink
            to="/links"
            className={({ isActive }) =>
              `${
                isActive ? "bg-lightPurple text-primary" : ""
              } text-mediumGrey flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors hover:text-primary max-[800px]:px-3`
            }
            title="links"
          >
            <LinkIcon width={20} height={20} />
            <span className="block max-sm:hidden">Links</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile-details"
            className={({ isActive }) =>
              `${
                isActive ? "bg-lightPurple text-primary" : ""
              } text-mediumGrey flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors hover:text-primary max-[800px]:px-3`
            }
            title="profile details"
          >
            <EditIcon width={20} height={20} />
            <span className="block max-sm:hidden">Profile Details</span>
          </NavLink>
        </li>
      </ul>
      <NavProfile />
    </nav>
  );
};

export default NavBar;
