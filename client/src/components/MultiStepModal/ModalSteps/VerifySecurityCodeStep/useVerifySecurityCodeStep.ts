import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { IDefaultResponse } from "../../../../apiRequests";
import { useDispatch } from "react-redux";
import { addPopupAction } from "../../../../redux/features/globalPopupsSlice/globalPopupsSlice";
import { SecurityCodeInput } from "./VerifySecurityCodeStep.schema";

function useVerifySecurityCodeStep({
  onSuccess,
}: {
  onSuccess: (securityToken: string) => Promise<void>;
}) {
  const dispatch = useDispatch();

  const axiosPrivate = useAxiosPrivate();

  async function submit(formData: SecurityCodeInput) {
    const verificationResult = await axiosPrivate.post<IDefaultResponse<{ securityToken: string }>>(
      "/security-code/verify",
      { securityCode: formData.securityCode },
    );

    const data = verificationResult.data;

    if (data.success && data.data) {
      await onSuccess(data.data.securityToken);
    } else {
      dispatch(
        addPopupAction({
          type: "error",
          message: verificationResult.data.errors
            ? verificationResult.data.errors[0]
            : "Something went wrong. Please try again later.",
        }),
      );
    }
  }

  return { submit };
}

export default useVerifySecurityCodeStep;
