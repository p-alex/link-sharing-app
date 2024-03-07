import { IDefaultResponse } from "../../../../apiRequests";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useForm from "../../../../hooks/useForm";
import Button from "../../../Button";
import InputGroup from "../../../InputGroup";
import {
  PasswordVerificationFormType,
  passwordVerificationFormSchema,
} from "./passwordVerificationStep.schema";
import ModalStep, { IModalStepProps } from "../ModalStep";

function PasswordValidationStep({ onSuccess }: IModalStepProps) {
  const { register, formState, handleSubmit } = useForm({
    payload: { password: "" },
    zodSchema: passwordVerificationFormSchema,
  });

  const { submit } = usePasswordValidationStep({ onSuccess });

  return (
    <ModalStep
      title={"Password verification"}
      description={"You need to verify your password"}
      render={(context) => {
        return (
          <form className="flex flex-col gap-6" onSubmit={(event) => handleSubmit(event, submit)}>
            <InputGroup
              label={<InputGroup.InputLabel htmlFor="password">Password</InputGroup.InputLabel>}
              input={
                <InputGroup.Input
                  type="password"
                  {...register("password")}
                  placeholder="Type your password..."
                  autoFocus
                />
              }
              error={
                formState.fieldErrors?.password ? (
                  <InputGroup.InputError>{formState.fieldErrors?.password}</InputGroup.InputError>
                ) : null
              }
            />
            <div className="">
              <Button
                variant="fill"
                type="submit"
                className="w-full"
                disabled={formState.isLoading}
                ref={context.lastFocusableElementRef}
              >
                Verify
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
}

function usePasswordValidationStep<TSuccess extends Function>({
  onSuccess,
}: {
  onSuccess: TSuccess;
}) {
  const axiosPrivate = useAxiosPrivate();

  const submit = async (data: PasswordVerificationFormType) => {
    const response = await axiosPrivate.post<IDefaultResponse<null>>("/users/check-password", data);
    if (response.data.success) {
      onSuccess();
    }
  };

  return { submit };
}

export default PasswordValidationStep;
