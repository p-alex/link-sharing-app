import MultiStepModal from "../MultiStepModal";
import useDeleteAccountModal from "./useDeleteAccountModal";

const DeleteAccountModal = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const { steps } = useDeleteAccountModal({ handleCloseModal });

  return (
    <MultiStepModal
      name="delete account"
      handleCloseModal={handleCloseModal}
      steps={(context) =>
        steps.map((step) => {
          return step({ context });
        })
      }
    />
  );
};

export default DeleteAccountModal;
