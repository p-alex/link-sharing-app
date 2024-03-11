import useForm from "../../../../hooks/useForm";
import Button from "../../../Button";
import Captcha from "../../../Captcha";
import ModalStep, { IModalStepProps } from "../ModalStep";
import useSecurityCodeStep from "./useSendSecurityCodeStep";

const SendSecurityCodeStep = ({
  onSuccess,
  description,
}: {
  onSuccess: IModalStepProps["onSuccess"];
  description: string;
}) => {
  const { handleSubmit, formState } = useForm({
    payload: {},
    zodSchema: undefined,
  });

  const { captchaRef, submit } = useSecurityCodeStep({ onSuccess });

  return (
    <ModalStep
      title="Sign out other sessions"
      description={description}
      render={({ lastFocusableElementRef }) => {
        return (
          <form onSubmit={(event) => handleSubmit(event, submit)}>
            <Button
              className="w-full"
              ref={lastFocusableElementRef}
              type="submit"
              autoFocus
              disabled={formState.isLoading}
            >
              Send security code
            </Button>
            <Captcha captchaRef={captchaRef} />
          </form>
        );
      }}
    />
  );
};

export default SendSecurityCodeStep;
