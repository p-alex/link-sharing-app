import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InfoIcon, LockIcon } from "../../svgs";
import AccountTab from "./AccountTab/AccountTab";
import SecurityTab from "./SecurityTab/SecurityTab";

const TABS = {
  account: {
    tab: <AccountTab />,
    icon: <InfoIcon width={20} height={20} />,
  },
  security: {
    tab: <SecurityTab />,
    icon: <LockIcon width={20} height={20} />,
  },
};

export type SettingsTabsType = {
  [Property in keyof typeof TABS]: { tab: React.ReactNode; icon: React.ReactNode };
};

const useSettingsPage = () => {
  const navigate = useNavigate();
  const params = useParams<{ tab: keyof SettingsTabsType }>();
  let activeTab = params.tab;

  if (!activeTab || !Object.keys(TABS).includes(activeTab)) {
    const firstTab = Object.keys(TABS)[0] as keyof SettingsTabsType;
    activeTab = firstTab;
    navigate("/settings/" + firstTab);
  }

  useEffect(() => {
    if (!activeTab || !Object.keys(TABS).includes(activeTab)) {
      const defaultTab = Object.keys(TABS)[0];
      navigate("/settings/" + defaultTab);
    }
  }, [params]);

  return { TABS, activeTab };
};

export default useSettingsPage;
