import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IDefaultResponse } from "../../../apiRequests";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/features/auth/authSlice";
import useHideWhenClickOutside from "../../../hooks/useHideWhenClickOutside";

const useNavProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useHideWhenClickOutside({ containerId: "nav-profile", hideFunc: () => setIsActive(false) });

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

  return { authState, isActive, handleLogout, handleToggleDropdown };
};

export default useNavProfile;
