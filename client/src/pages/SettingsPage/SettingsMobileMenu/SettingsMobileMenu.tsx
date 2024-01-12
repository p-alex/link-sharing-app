import { ChevronDownIcon, ChevronUpIcon } from "../../../svgs";
import { Link } from "react-router-dom";
import useSettingsMobileMenu from "./useSettingsMobileMenu";
import { SettingsTabsType } from "../useSettingsPage";
import FocusTrapRedirectFocus from "../../../components/focusTrap";

interface Props {
  tabs: SettingsTabsType;
  activeTab?: keyof SettingsTabsType;
}

const SettingsMobileMenu = ({ tabs, activeTab }: Props) => {
  const {
    isActive,
    tabsKeyList,
    handleToggleMenu,
    firstFocusableElement,
    lastFocusableElement,
    toggleRef,
  } = useSettingsMobileMenu(tabs, activeTab);

  return (
    <div className="relative hidden max-[800px]:block" id="settings-mobile-menu">
      <button
        className={`${
          isActive ? "bg-lightPurple text-primary" : "bg-white text-mediumGrey"
        } flex h-[56px] w-full items-center justify-center gap-2 rounded-lg  px-6 py-4 font-semibold capitalize hover:bg-lightPurple hover:text-primary`}
        aria-label={`${activeTab} tab`}
        onClick={handleToggleMenu}
        ref={toggleRef}
      >
        {activeTab && tabs[activeTab]?.icon && tabs[activeTab]?.icon}
        <span>{activeTab}</span>
        {isActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {isActive && (
        <>
          <FocusTrapRedirectFocus element={lastFocusableElement} />
          <ul className="absolute top-[76px] z-10 w-full overflow-hidden rounded-lg bg-white shadow-lg">
            {tabsKeyList.map((tabKey, index) => {
              const currentTabKey = tabKey as keyof SettingsTabsType;
              return (
                <li key={"settingsMobileMenu-" + tabKey}>
                  <Link
                    ref={
                      index === 0
                        ? firstFocusableElement
                        : index + 1 === tabsKeyList.length
                          ? lastFocusableElement
                          : undefined
                    }
                    className="flex w-full items-center justify-center gap-2 px-6 py-4 font-semibold capitalize text-mediumGrey hover:bg-lightPurple hover:text-primary"
                    to={"/settings/" + currentTabKey}
                  >
                    {tabs[currentTabKey]?.icon && tabs[currentTabKey]?.icon}
                    {currentTabKey}
                  </Link>
                </li>
              );
            })}
          </ul>
          <FocusTrapRedirectFocus element={firstFocusableElement} />
        </>
      )}
    </div>
  );
};

export default SettingsMobileMenu;
