import Button from "../../../../../components/Button";
import InputGroup from "../../../../../components/InputGroup";
import SettingBox from "../../../SettingBox";
import useChangePasswordBox from "./useChangePasswordBox";

const ChangePasswordBox = () => {
  const { register, handleChangePassword, formState } = useChangePasswordBox();

  return (
    <SettingBox
      title="Change password"
      description="For your security, we highly recommend that you choose a unique password that you don't use for any other online account."
    >
      <form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
        <InputGroup
          label={<InputGroup.InputLabel htmlFor="oldPassword">Old Password</InputGroup.InputLabel>}
          input={
            <InputGroup.Input
              icon={<img src="/images/icon-password.svg" alt="" width={16} height={16} />}
              type="password"
              placeholder="Enter your current password..."
              {...register("oldPassword")}
            />
          }
          error={
            formState.fieldErrors?.oldPassword ? (
              <InputGroup.InputError>{formState.fieldErrors.oldPassword}</InputGroup.InputError>
            ) : null
          }
        />
        <InputGroup
          label={<InputGroup.InputLabel htmlFor="newPassword">New Password</InputGroup.InputLabel>}
          input={
            <InputGroup.Input
              icon={<img src="/images/icon-password.svg" alt="" width={16} height={16} />}
              type="password"
              placeholder="Enter your new password..."
              {...register("newPassword")}
            />
          }
          error={
            formState.fieldErrors?.newPassword ? (
              <InputGroup.InputError>{formState.fieldErrors.newPassword}</InputGroup.InputError>
            ) : null
          }
        />
        <InputGroup
          label={
            <InputGroup.InputLabel htmlFor="confirmNewPassword">
              Confirm New Password
            </InputGroup.InputLabel>
          }
          input={
            <InputGroup.Input
              icon={<img src="/images/icon-password.svg" alt="" width={16} height={16} />}
              placeholder="Repeat your new password..."
              type="password"
              {...register("confirmNewPassword")}
            />
          }
          error={
            formState.fieldErrors?.confirmNewPassword ? (
              <InputGroup.InputError>
                {formState.fieldErrors.confirmNewPassword}
              </InputGroup.InputError>
            ) : null
          }
        />
        <Button
          variant="fill"
          type="submit"
          className="w-max"
          disabled={formState.isLoading || !formState.isValid}
        >
          Change Password
        </Button>
      </form>
    </SettingBox>
  );
};

export default ChangePasswordBox;
