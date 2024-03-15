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
        <div className="flex items-end gap-2">
          <InputGroup
            label={<InputGroup.InputLabel htmlFor="accountId">Account ID</InputGroup.InputLabel>}
            input={
              <InputGroup.Input
                className="w-[200px]"
                type="text"
                name="accountId"
                id="accountId"
                value={authState.id}
                disabled
              />
            }
            error={null}
          />
        </div>
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
        </div>
      </div>
    </SettingBox>
  );
};

export default AccountInformationBox;
