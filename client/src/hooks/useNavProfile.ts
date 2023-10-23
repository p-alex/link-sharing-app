import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { IDefaultResponse } from "../apiRequests";

const useNavProfile = () => {
  const navigate = useNavigate();
  const { authState, dispatchAuth } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleToggleDropdown = () => setIsActive((prevState) => !prevState);

  const handleLogout = async () => {
    try {
      const result = await axiosPrivate.post<IDefaultResponse<null>>(
        "/auth/logout",
        {},
        { withCredentials: true },
      );
      if (result.data.success) {
        dispatchAuth({ type: "LOGOUT", payload: null });
        navigate("/sign-in");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleCloseWhenClickOutside = (navProfile: HTMLDivElement) => (event: MouseEvent) => {
    if (!navProfile) return;
    if (!navProfile.contains(event.target as HTMLElement)) setIsActive(false);
  };

  useEffect(() => {
    const navProfile = document.getElementById("nav-profile") as HTMLDivElement;
    document.addEventListener("click", handleCloseWhenClickOutside(navProfile));
    return () => {
      document.removeEventListener("click", handleCloseWhenClickOutside(navProfile));
    };
  }, []);

  return { authState, isActive, handleLogout, handleToggleDropdown };
};

export default useNavProfile;
