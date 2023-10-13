import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Section from "../components/Section";
import useForm from "../hooks/useForm";
import { ResetPasswordType, resetPasswordSchema } from "../schemas/user.schema";
import Error from "../components/Error/Error";
import InputGroup from "../components/InputGroup";
import Button from "../components/Button";
import { resetPassword, resetPasswordConfirmation } from "../apiRequests/users";
import { AxiosError } from "axios";
import { tokenSchema } from "../schemas/common.schema";
import getParamFromUrl from "../utils/getParamFromUrl";
import SuccessIcon from "../svgs/SuccessIcon";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [confirmationState, setConfirmationState] = useState({
    isConfirmed: false,
    error: "",
  });
  const [success, setSuccess] = useState(false);

  const { formState, reset, register, handleSubmit } = useForm({
    payload: { password: "", confirmPassword: "" },
    zodSchema: resetPasswordSchema,
  });

  const submit = async (data: ResetPasswordType) => {
    const result = await resetPassword({
      password: data.password,
      token: getParamFromUrl("token") as string,
    });
    if (result.success) {
      reset();
      setSuccess(true);
    }
  };

  const handleConfirmToken = async (token: string) => {
    try {
      const result = await resetPasswordConfirmation({ token });
      if (result.success) {
        setConfirmationState((prevState) => ({ ...prevState, isConfirmed: true }));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof AxiosError) {
        setConfirmationState((prevState) => ({
          ...prevState,
          error: error.response?.data.errors[0],
        }));
      }
    }
  };

  const validateToken = useCallback((token: string) => {
    if (!tokenSchema.safeParse(token).success) return null;
    return token;
  }, []);

  const effectRan = useRef<boolean>(false);

  useEffect(() => {
    if (!effectRan) {
      const token = getParamFromUrl("token");
      if (!token) return navigate("/sign-in");
      const validToken = validateToken(token);
      if (!validToken) return navigate("/sign-in");
      handleConfirmToken(validToken);
    }
    return () => {
      effectRan.current = true;
    };
  }, [navigate, validateToken]);

  return (
    <main className="flex w-full flex-col px-2">
      <div className="relative mx-auto mt-10 w-full max-w-[476px] sm:mt-20">
        <Link to={"/"}>
          <img
            src="/images/logo-devlinks-large.svg"
            className="mx-auto mb-[51px]"
            width={183}
            height={40}
            alt=""
          />
        </Link>

        <Section title={confirmationState.isConfirmed ? "Reset password" : undefined}>
          {!success && (
            <form onSubmit={(event) => handleSubmit(event, submit)}>
              {formState.responseError && (
                <Error message={formState.responseError} className="mb-4" />
              )}

              {confirmationState.error && (
                <Error message={confirmationState.error} className="mb-4" />
              )}

              <div className="flex flex-col gap-6">
                <InputGroup
                  label={
                    <InputGroup.InputLabel htmlFor="password">New Password</InputGroup.InputLabel>
                  }
                  input={
                    <InputGroup.Input
                      {...register("password")}
                      icon={<img src="/images/icon-password.svg" alt="" width={16} height={16} />}
                      type="password"
                      placeholder="Enter your new password"
                      autoFocus
                    />
                  }
                  error={
                    formState.fieldErrors?.password ? (
                      <InputGroup.InputError>
                        {formState.fieldErrors?.password}
                      </InputGroup.InputError>
                    ) : null
                  }
                />

                <InputGroup
                  label={
                    <InputGroup.InputLabel htmlFor="confirmPassword">
                      Confirm new password
                    </InputGroup.InputLabel>
                  }
                  input={
                    <InputGroup.Input
                      {...register("confirmPassword")}
                      icon={<img src="/images/icon-password.svg" alt="" width={16} height={16} />}
                      type="password"
                      placeholder="Retype your new password"
                    />
                  }
                  error={
                    formState.fieldErrors?.confirmPassword ? (
                      <InputGroup.InputError>
                        {formState.fieldErrors?.confirmPassword}
                      </InputGroup.InputError>
                    ) : null
                  }
                />

                <div className="flex flex-col">
                  <Button type="submit" disabled={formState.isLoading || !formState.isValid}>
                    {formState.isLoading ? "Loading..." : "Send confirmation email"}
                  </Button>
                </div>
              </div>
            </form>
          )}
          {success && (
            <div className="flex flex-col gap-6 text-center">
              <SuccessIcon width={80} height={80} className="mx-auto text-green-500" />
              <div className="flex flex-col gap-4">
                <h1>Success</h1>
                <Button onClick={() => navigate("/sign-in")}>Go to Login Page</Button>
              </div>
            </div>
          )}
        </Section>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
