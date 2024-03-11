import MultiStepModal from "../../MultiStepModal";
import { IMultiStepModalProps } from "../../MultiStepModal/MultiStepModal";
import useSignOutEverywhereModal from "./useSignOutEverywhereModal";

const SignOutEverywhereModal = ({ handleCloseModal }: IMultiStepModalProps) => {
  const { steps } = useSignOutEverywhereModal({ handleCloseModal });

  return (
    <MultiStepModal
      name="sign out everywhere"
      handleCloseModal={handleCloseModal}
      steps={(context) => steps.map((step) => step({ context }))}
    />
  );
};

export default SignOutEverywhereModal;
