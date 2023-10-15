import LinkIcon from "../../svgs/LinkIcon";
import ProfileDetailsHeaderIcon from "../../svgs/ProfileDetailsHeaderIcon";
import PreviewHeaderIcon from "../../svgs/PreviewHeaderIcon";
import Logo from "../Logo";
import NavBarLink from "./NavBarLink";

const NavBar = () => {
  return (
    <nav className="mt-6 flex w-full items-center justify-between rounded-lg bg-white px-6 py-4 max-[800px]:mt-0 max-[800px]:rounded-none">
      <Logo />
      <ul className="flex items-center gap-4 max-[800px]:gap-0">
        <li>
          <NavBarLink to="/links" title="links" icon={<LinkIcon width={20} height={20} />}>
            Links
          </NavBarLink>
        </li>
        <li>
          <NavBarLink
            to="/profile-details"
            title="profile details"
            icon={<ProfileDetailsHeaderIcon width={20} height={20} />}
          >
            Profile Details
          </NavBarLink>
        </li>
      </ul>
      <NavBarLink to="/preview" title="preview" icon={<PreviewHeaderIcon width={20} height={20} />}>
        Preview
      </NavBarLink>
    </nav>
  );
};

export default NavBar;
