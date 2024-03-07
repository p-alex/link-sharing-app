import Button from "../../../../../components/Button";
import SettingBox from "../../../SettingBox";

const SignOutEverywhereBox = () => {
  return (
    <SettingBox
      title="Sign Out Everywhere"
      description="Sign out everywhere else your Devlinks account is being used, including all other
    browsers, phones or other devices"
    >
      <Button variant="outline" className="w-max">
        Sign out other sessions
      </Button>
    </SettingBox>
  );
};

export default SignOutEverywhereBox;
