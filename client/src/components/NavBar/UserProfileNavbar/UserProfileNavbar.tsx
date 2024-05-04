import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import LoggedInUserProfileNavbar from "./LoggedInUserProfileNavbar";
import LoggedOutUserProfileNavbar from "./LoggedOutUserProfileNavbar";
import isUUID from "../../../utils/isUUID";

function UserProfileNavbar() {
  const { isAuth, authState } = useAuth();
  const params = useParams<{ userId: string }>();
  const isValidUserId = isUUID(params.userId);
  const isAuthUserId = authState.id === params.userId;

  return (
    <>
      {isAuth ? (
        <LoggedInUserProfileNavbar showShareLinkButton={isValidUserId && isAuthUserId} />
      ) : (
        <LoggedOutUserProfileNavbar />
      )}
    </>
  );
}

export default UserProfileNavbar;
