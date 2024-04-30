import useForm from "../../../../hooks/useForm";
import Button from "../../../Button";
import ModalStep, { IModalStepProps } from "../ModalStep";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { IDefaultResponse } from "../../../../apiRequests";

function DeleteAccountConfirmationStep({ onSuccess }: IModalStepProps) {
  const { handleSubmit, formState } = useForm({ payload: {}, zodSchema: undefined });

  const { submit } = useDeleteAccountConfirmationStep({ onSuccess });

  return (
    <ModalStep
      title={"Account deletion"}
      description={"Are you sure you want to delete your account permanently?"}
      render={(context) => {
        return (
          <form onSubmit={(event) => handleSubmit(event, submit)}>
            <Button
              variant="error"
              type="submit"
              className="w-full"
              disabled={formState.isLoading}
              ref={context.lastFocusableElementRef}
              autoFocus
            >
              Yes, delete my account
            </Button>
          </form>
        );
      }}
    />
  );
}

const useDeleteAccountConfirmationStep = ({
  onSuccess,
}: {
  onSuccess: IModalStepProps["onSuccess"];
}) => {
  const axiosPrivate = useAxiosPrivate();

  const submit = async () => {
    const response = await axiosPrivate.delete<IDefaultResponse<null>>("/users/delete-request");
    if (response.data.success) {
      onSuccess();
    }
  };

  return { submit };
};

export default DeleteAccountConfirmationStep;
