import Layout from "../../layout";
import SettingsSideMenu from "./SettingsSideMenu/SettingsSideMenu";
import SettingsMobileMenu from "./SettingsMobileMenu/SettingsMobileMenu";
import useSettingsPage from "./useSettingsPage";
import EditorNavbar from "../../components/NavBar/EditorNavbar";

const SettingsPage = () => {
  const { TABS, activeTab } = useSettingsPage();

  return (
    <Layout navbar={<EditorNavbar />}>
      <div className="flex gap-6 max-[800px]:flex-col">
        <SettingsSideMenu tabs={TABS} activeTab={activeTab} />
        <SettingsMobileMenu tabs={TABS} activeTab={activeTab} />
        {activeTab && TABS[activeTab].tab}
      </div>
    </Layout>
  );
};

export default SettingsPage;
