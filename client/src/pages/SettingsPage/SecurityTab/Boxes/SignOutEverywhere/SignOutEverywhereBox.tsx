import { useRef, useState } from "react";
import Button from "../../../../../components/Button";
import SettingBox from "../../../SettingBox";
import { SignOutEverywhereModal } from "../../../../../components/Modals";

const SignOutEverywhereBox = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleToggleOffModal = () => setIsModalActive(false);
  const handleToggleOnModal = () => {
    setIsModalActive(true);
    signOutOtherSessionsBtn.current?.focus();
  };

  const signOutOtherSessionsBtn = useRef<HTMLButtonElement>(null);

  return (
    <SettingBox
      title="Sign Out Everywhere"
      description="Sign out everywhere else your Devlinks account is being used, including all other
    browsers, phones or other devices"
    >
      <Button
        variant="outline"
        className="w-max"
        onClick={handleToggleOnModal}
        ref={signOutOtherSessionsBtn}
      >
        Sign out other sessions
      </Button>

      {isModalActive && <SignOutEverywhereModal handleCloseModal={handleToggleOffModal} />}
    </SettingBox>
  );
};

export default SignOutEverywhereBox;
