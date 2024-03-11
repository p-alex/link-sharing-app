import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ModalStepsListType } from "../../MultiStepModal/MultiStepModal";
import { DeleteAccountStep, PasswordValidationStep } from "../../MultiStepModal/ModalSteps";
import { auth_logoutAction } from "../../../redux/features/auth/authSlice";
import { addPopupAction } from "../../../redux/features/globalPopupsSlice/globalPopupsSlice";

function useDeleteAccountModal({ handleCloseModal }: { handleCloseModal: () => void }): {
  steps: ModalStepsListType[];
} {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const steps: ModalStepsListType[] = [
    ({ context }) => <PasswordValidationStep onSuccess={context.handleNextStep} />,
    () => <DeleteAccountStep onSuccess={handleFinalStepSuccess} />,
  ];

  const handleFinalStepSuccess = () => {
    handleCloseModal();
    navigate("/sign-in", { replace: true });
    dispatch(auth_logoutAction());
    dispatch(addPopupAction({ type: "info", message: "Account deleted successfully!" }));
  };

  return { steps };
}

export default useDeleteAccountModal;
