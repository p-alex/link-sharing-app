import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  IPopup,
  removeLastPopupAction,
  removePopupAction,
  useGlobalPopupsSlice,
} from "../../redux/features/globalPopupsSlice/globalPopupsSlice";
import { ErrorIcon, InfoIcon } from "../../svgs";

const POPUP_STYLES = {
  error: {
    bg: "bg-error",
    icon: <ErrorIcon />,
  },
  info: {
    bg: "bg-[#333]",
    icon: <InfoIcon />,
  },
};

const useGlobalPopups = () => {
  const dispatch = useDispatch();
  const { popups } = useGlobalPopupsSlice();

  const handlePopErrors = useCallback(() => {
    if (popups.length === 0) return;
    dispatch(removeLastPopupAction());
  }, [popups, dispatch]);

  const handleRemovePopup = (error: IPopup) => {
    dispatch(removePopupAction({ error }));
  };

  useEffect(() => {
    const interval = setInterval(handlePopErrors, 4000);
    return () => clearInterval(interval);
  }, [handlePopErrors]);

  return { popups, POPUP_STYLES, handleRemovePopup };
};

export default useGlobalPopups;
