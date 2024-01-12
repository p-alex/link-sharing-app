import { useCallback, useEffect, useRef, useState } from "react";
import { SettingsTabsType } from "../useSettingsPage";
import useHideWhenClickOutside from "../../../hooks/useHideWhenClickOutside";

const useSettingsMobileMenu = (tabs: SettingsTabsType, activeTab?: keyof SettingsTabsType) => {
  const tabsKeyList = Object.keys(tabs);
  const [isActive, setIsActive] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstFocusableElement = useRef<HTMLAnchorElement>(null);
  const lastFocusableElement = useRef<HTMLAnchorElement>(null);

  useHideWhenClickOutside({
    containerId: "settings-mobile-menu",
    hideFunc: () => setIsActive(false),
  });

  const handleToggleMenu = () => {
    setIsActive((prevState) => {
      if (prevState === false) {
        redirectToFirstFocusable();
      }
      return !prevState;
    });
  };

  const handleHideMenu = () => {
    setIsActive(false);
    toggleRef.current?.focus();
  };

  const handleHideWithEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;
      if (event.key === "Escape") handleHideMenu();
    },
    [isActive],
  );

  const redirectToFirstFocusable = () => {
    setTimeout(() => firstFocusableElement.current?.focus(), 0);
  };

  useEffect(() => {
    handleHideMenu();
  }, [activeTab]);

  useEffect(() => {
    document.addEventListener("keydown", handleHideWithEscKey);
    return () => {
      document.removeEventListener("keydown", handleHideWithEscKey);
    };
  }, [handleHideWithEscKey]);

  return {
    isActive,
    tabsKeyList,
    handleToggleMenu,
    firstFocusableElement,
    lastFocusableElement,
    toggleRef,
  };
};

export default useSettingsMobileMenu;
