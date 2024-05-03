import { Link } from "react-router-dom";
import { EditIcon, LinkIcon } from "../../../svgs";
import NavProfile from "../NavProfile";
import NavigationLink from "../NavigationLink";
import NavbarContainer from "../NavbarContainer";
import NavbarLogo from "../NavbarLogo";

const EditorNavbar = () => {
  return (
    <NavbarContainer>
      <Link to="/links" aria-label="devlinks">
        <NavbarLogo />
      </Link>
      <ul className="flex items-center gap-2">
        <li>
          <NavigationLink to="/links" icon={<LinkIcon width={20} height={20} />}>
            Links
          </NavigationLink>
        </li>
        <li>
          <NavigationLink to="/profile-details" icon={<EditIcon width={20} height={20} />}>
            Profile Details
          </NavigationLink>
        </li>
      </ul>
      <NavProfile />
    </NavbarContainer>
  );
};

export default EditorNavbar;
