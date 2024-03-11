import { FormEvent } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useCaptcha from "../../../../hooks/useCaptcha";
import { IDefaultResponse } from "../../../../apiRequests";
import { useDispatch } from "react-redux";
import { addPopupAction } from "../../../../redux/features/globalPopupsSlice/globalPopupsSlice";

function useSecurityCodeStep<TSuccess extends Function>({ onSuccess }: { onSuccess: TSuccess }) {
  const dispatch = useDispatch();
  const { captchaRef, getCaptchaToken } = useCaptcha();

  const axiosPrivate = useAxiosPrivate();

  async function submit() {
    const captchaToken = await getCaptchaToken();
    const result = await axiosPrivate.post<IDefaultResponse<null>>("/security-code/send", {
      captchaToken,
    });
    if (result.data.success) {
      onSuccess();
    } else {
      dispatch(
        addPopupAction({
          type: "error",
          message: result.data.errors
            ? result.data.errors[0]
            : "Something went wrong. Please try again later.",
        }),
      );
    }
  }

  return { captchaRef, submit };
}

export default useSecurityCodeStep;
