import Button from "../../../../components/Button";
import InputGroup from "../../../../components/InputGroup";
import useAuth from "../../../../hooks/useAuth";
import { EditIcon } from "../../../../svgs";
import SettingBox from "../../SettingBox";

const AccountInformationBox = () => {
  const { authState } = useAuth();
  return (
    <SettingBox title="Account information">
      <div className="flex flex-col gap-4">
        <p>ID: {authState.id}</p>
        <div className="flex items-end gap-2">
          <InputGroup
            label={<InputGroup.InputLabel htmlFor="email">Email</InputGroup.InputLabel>}
            input={
              <InputGroup.Input
                className="w-[200px]"
                type="email"
                name="email"
                id="email"
                value={authState.email}
                disabled
              />
            }
            error={null}
          />
          <Button
            variant="fill"
            icon={<EditIcon width={21} height={21} />}
            title="change your email"
          ></Button>
        </div>
      </div>
    </SettingBox>
  );
};

export default AccountInformationBox;
