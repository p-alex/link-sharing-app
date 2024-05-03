import { useDispatch } from "react-redux";
import Button from "../../Button";
import NavProfile from "../NavProfile";
import NavbarContainer from "../NavbarContainer";
import { Link } from "react-router-dom";
import { addPopupAction } from "../../../redux/features/globalPopupsSlice/globalPopupsSlice";
import NavbarLogo from "../NavbarLogo";

function LoggedInUserProfileNavbar() {
  const dispatch = useDispatch();

  const handleSaveLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(
      addPopupAction({ type: "info", message: "The link has been copied to your clipboard!" }),
    );
  };

  return (
    <NavbarContainer>
      <Link to={"/links"}>
        <NavbarLogo />
      </Link>
      <div className="flex gap-2">
        <Button variant="fill" onClick={handleSaveLinkToClipboard}>
          Share
        </Button>
        <NavProfile />
      </div>
    </NavbarContainer>
  );
}

export default LoggedInUserProfileNavbar;
