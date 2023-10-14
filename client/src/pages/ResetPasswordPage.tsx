import { Link, useNavigate } from "react-router-dom";
import Section from "../components/Section";
import useForm from "../hooks/useForm";
import { resetPasswordSchema } from "../schemas/user.schema";
import Error from "../components/Error/Error";
import InputGroup from "../components/InputGroup";
import Button from "../components/Button";
import SuccessIcon from "../svgs/SuccessIcon";
import useResetPasswordPage from "../hooks/useResetPasswordPage";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const { formState, reset, register, handleSubmit } = useForm({
    payload: { password: "", confirmPassword: "" },
    zodSchema: resetPasswordSchema,
  });

  const { step, confirmationError, submit } = useResetPasswordPage({ resetForm: reset });

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

        {step === "token-confirmation-step" && (
          <Section>
            <p>Varifying...</p>
          </Section>
        )}

        {step === "token-confirmation-error-step" && (
          <Section>
            <Error message={confirmationError} />
          </Section>
        )}

        {step === "reset-password-step" && (
          <Section title={"Reset password"} description="Please provide your new password">
            <form onSubmit={(event) => handleSubmit(event, submit)}>
              {formState.responseError && (
                <Error message={formState.responseError} className="mb-4" />
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
                    {formState.isLoading ? "Loading..." : "Reset password"}
                  </Button>
                </div>
              </div>
            </form>
          </Section>
        )}

        {step === "success-step" && (
          <Section>
            <div className="flex flex-col gap-6 text-center">
              <SuccessIcon width={80} height={80} className="mx-auto text-green-500" />
              <div className="flex flex-col gap-4">
                <h1>Success</h1>
                <Button onClick={() => navigate("/sign-in")}>Go to Login Page</Button>
              </div>
            </div>
          </Section>
        )}
      </div>
    </main>
  );
};

export default ResetPasswordPage;
