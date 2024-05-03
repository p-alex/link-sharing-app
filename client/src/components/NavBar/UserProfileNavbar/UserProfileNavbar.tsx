import useAuth from "../../../hooks/useAuth";
import LoggedInUserProfileNavbar from "./LoggedInUserProfileNavbar";
import LoggedOutUserProfileNavbar from "./LoggedOutUserProfileNavbar";

function UserProfileNavbar() {
  const { isAuth } = useAuth();

  return <>{isAuth ? <LoggedInUserProfileNavbar /> : <LoggedOutUserProfileNavbar />}</>;
}

export default UserProfileNavbar;
