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
      title={"Delete account"}
      description={"Are you sure?"}
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
              Delete my account
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
