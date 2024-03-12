import { ModalStepsListType } from "../../MultiStepModal/MultiStepModal";
import { useDispatch } from "react-redux";
import { addPopupAction } from "../../../redux/features/globalPopupsSlice/globalPopupsSlice";
import SendSecurityCodeStep from "../../MultiStepModal/ModalSteps/SendSecurityCodeStep/SendSecurityCodeStep";
import VerifySecurityCodeStep from "../../MultiStepModal/ModalSteps/VerifySecurityCodeStep/VerifySecurityCodeStep";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IDefaultResponse } from "../../../apiRequests";

const useSignOutEverywhereModal = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const dispatch = useDispatch();

  const axiosPrivate = useAxiosPrivate();

  const steps: ModalStepsListType[] = [
    ({ context }) => (
      <SendSecurityCodeStep
        onSuccess={context.handleNextStep}
        description="We will send you a verification code to your email"
      />
    ),
    () => (
      <VerifySecurityCodeStep
        onSuccess={(securityToken: string) => handleFinalStepSuccess(securityToken)}
        description="Sign out everywhere else your Devlinks account is being used."
        btnText="Sign out other sessions"
      />
    ),
  ];

  const handleFinalStepSuccess = async (securityToken: string) => {
    try {
      const { data } = await axiosPrivate.delete<IDefaultResponse<null>>(
        "/sessions/delete-all-other-sessions",
        { data: { securityToken } },
      );
      if (data.success) {
        handleCloseModal();
        dispatch(
          addPopupAction({
            type: "info",
            message: "You successfully signed out all other sessions",
          }),
        );
      }
    } catch (error: unknown) {
      handleCloseModal();
      dispatch(
        addPopupAction({
          type: "error",
          message: "Something went wrong. Please try again later.",
        }),
      );
    }
  };

  return { steps };
};

export default useSignOutEverywhereModal;
