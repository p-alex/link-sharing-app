import { Link } from "react-router-dom";
import { SettingsTabsType } from "../useSettingsPage";

interface Props {
  tabs: SettingsTabsType;
  activeTab?: keyof SettingsTabsType;
}

const SettingsSideMenu = ({ tabs, activeTab }: Props) => {
  return (
    <aside className="hidden h-max w-[225px] shrink-0 flex-col overflow-hidden rounded-lg bg-white min-[800px]:flex">
      <ul>
        {Object.keys(tabs).map((tabKey) => {
          const currentTab = tabKey as keyof SettingsTabsType;
          return (
            <li key={tabKey}>
              <Link
                to={"/settings/" + currentTab}
                className={`${
                  currentTab === activeTab ? "bg-lightPurple text-primary" : ""
                } flex items-center gap-2 px-6 py-4 font-semibold capitalize hover:bg-lightPurple`}
              >
                {tabs[currentTab]?.icon && tabs[currentTab]?.icon} {currentTab}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SettingsSideMenu;
