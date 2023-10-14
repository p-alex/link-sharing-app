import { useState } from "react";
import { SignUpSchemaType } from "../schemas/user.schema";
import { createUser } from "../apiRequests/users";

const useSignUpPage = ({ formReset }: { formReset: () => void }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const submit = async (data: SignUpSchemaType) => {
    const { success } = await createUser(data);
    if (success) {
      formReset();
      setSuccessMessage(
        "We've sent you an email to verify your email address and activate your account. The link in the email will expire in 24 hours.",
      );
    }
  };
  return { successMessage, submit };
};

export default useSignUpPage;
