import useForm from "../../../../hooks/useForm";
import Button from "../../../Button";
import InputGroup from "../../../InputGroup";
import ModalStep from "../ModalStep";
import { securityCodeSchema } from "./VerifySecurityCodeStep.schema";
import useVerifySecurityCodeStep from "./useVerifySecurityCodeStep";

const VerifySecurityCodeStep = ({
  onSuccess,
  description,
  btnText,
}: {
  onSuccess: (securityCode: string) => Promise<void>;
  description: string;
  btnText: string;
}) => {
  const { register, formState, handleSubmit } = useForm({
    payload: { securityCode: "" },
    zodSchema: securityCodeSchema,
  });

  const { submit } = useVerifySecurityCodeStep({ onSuccess });

  return (
    <ModalStep
      title="Enter Security Code"
      description={description}
      render={({ lastFocusableElementRef }) => {
        return (
          <form className="flex flex-col gap-6" onSubmit={(event) => handleSubmit(event, submit)}>
            <InputGroup
              label={<InputGroup.InputLabel>Security code</InputGroup.InputLabel>}
              input={<InputGroup.Input {...register("securityCode")} autoFocus />}
              error={
                formState.fieldErrors?.securityCode ? (
                  <InputGroup.InputError>
                    {formState.fieldErrors?.securityCode}
                  </InputGroup.InputError>
                ) : null
              }
            />
            <Button
              ref={lastFocusableElementRef}
              type="submit"
              disabled={formState.isLoading || !formState.isValid}
            >
              {btnText}
            </Button>
          </form>
        );
      }}
    />
  );
};

export default VerifySecurityCodeStep;
