import { useRef, useState } from "react";
import Button from "../../../../components/Button";
import DeleteAccountModal from "../../../../components/DeleteAccountModal/DeleteAccountModal";
import SettingBox from "../../SettingBox";

const DeleteAccountBox = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleCloseModal = () => {
    setIsModalActive(false);
    toggleButton.current?.focus();
  };
  const handleOpenModal = () => setIsModalActive(true);

  const toggleButton = useRef<HTMLButtonElement>(null);

  return (
    <SettingBox
      title="Delete account"
      description="This action will delete all data associated with your account permanently, and cannot be undone."
    >
      {isModalActive && <DeleteAccountModal handleCloseModal={handleCloseModal} />}
      <Button variant="error" onClick={handleOpenModal} ref={toggleButton}>
        Delete your account
      </Button>
    </SettingBox>
  );
};

export default DeleteAccountBox;
