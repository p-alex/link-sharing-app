import Button from "../../../../../components/Button";
import SettingBox from "../../../SettingBox";

const DeleteAccountBox = () => {
  return (
    <SettingBox
      title="Delete account"
      description="This action will delete all data associated with your account permanently, and cannot be undone."
    >
      <Button variant="error">Delete your account</Button>
    </SettingBox>
  );
};

export default DeleteAccountBox;
