import MultiStepModal from "../../MultiStepModal";
import { IMultiStepModalProps } from "../../MultiStepModal/MultiStepModal";
import useDeleteAccountModal from "./useDeleteAccountModal";

const DeleteAccountModal = ({ handleCloseModal }: IMultiStepModalProps) => {
  const { steps } = useDeleteAccountModal({ handleCloseModal });

  return (
    <MultiStepModal
      name="delete account"
      handleCloseModal={handleCloseModal}
      steps={(context) => steps.map((step) => step({ context }))}
    />
  );
};

export default DeleteAccountModal;
