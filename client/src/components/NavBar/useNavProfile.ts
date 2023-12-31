import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IDefaultResponse } from "../../apiRequests";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/features/auth/authSlice";

const useNavProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authState } = useAuth();
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
        dispatch(logoutAction());
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
