import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SecurityTab from "./SecurityTab/SecurityTab";
import { LockIcon } from "../../svgs";

const TABS = {
  security: {
    tab: <SecurityTab />,
    icon: <LockIcon />,
  },
};

export type SettingsTabsType = {
  [Property in keyof typeof TABS]: { tab: React.ReactNode; icon: React.ReactNode };
};

const useSettingsPage = () => {
  const navigate = useNavigate();
  const params = useParams<{ tab: keyof SettingsTabsType }>();
  const activeTab = params.tab;

  useEffect(() => {
    if (!activeTab || !Object.keys(TABS).includes(activeTab)) {
      const defaultTab = Object.keys(TABS)[0];
      navigate("/settings/" + defaultTab);
    }
  }, [params]);

  return { TABS, activeTab };
};

export default useSettingsPage;
