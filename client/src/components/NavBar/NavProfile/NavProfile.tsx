import { Link } from "react-router-dom";
import { LogoutIcon, ProfileDetailsHeaderIcon, SettingsIcon } from "../../../svgs";
import useNavProfile from "./useNavProfile";

const NavProfile = () => {
  const { authState, handleLogout, handleToggleDropdown, isActive } = useNavProfile();

  return (
    <div id="nav-profile">
      <button
        onClick={handleToggleDropdown}
        className={`${
          isActive ? "bg-lightPurple text-primary" : ""
        } flex items-center gap-2 rounded-lg p-3 font-semibold text-mediumGrey transition-colors hover:text-primary max-[800px]:px-3`}
        title="account"
      >
        <ProfileDetailsHeaderIcon width={24} height={24} />{" "}
      </button>
      {isActive && (
        <div className="absolute bottom-0 right-0 z-50 w-[300px] translate-y-[100%] pt-2">
          <div className=" flex  flex-col gap-2 rounded-lg bg-white p-4 text-center shadow-lg">
            <p className="mb-1 border-b-2 border-gray-100 pb-3 font-semibold text-primary">
              {authState.email}
            </p>
            <Link
              to="/settings"
              className="flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-mediumGrey transition-colors hover:bg-lightPurple hover:text-primary max-[800px]:px-3"
            >
              <SettingsIcon width={20} height={20} /> Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-mediumGrey transition-colors hover:bg-red-100 hover:text-error max-[800px]:px-3"
            >
              <LogoutIcon width={20} height={20} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavProfile;
