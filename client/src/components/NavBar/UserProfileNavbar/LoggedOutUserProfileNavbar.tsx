import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarContainer from "../NavbarContainer";
import NavbarLogo from "../NavbarLogo";
import Button from "../../Button";

function LoggedOutUserProfileNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <NavbarContainer>
      <Link to={"/links"}>
        <NavbarLogo />
      </Link>
      <Button onClick={() => navigate("/sign-in", { state: { path: location.pathname } })}>
        Log In
      </Button>
    </NavbarContainer>
  );
}

export default LoggedOutUserProfileNavbar;
