import { Link } from "react-router-dom";
import InputGroup from "../../components/InputGroup";
import { signUpSchema } from "../../schemas/user.schema";
import useForm from "../../hooks/useForm";
import Section from "../../components/Section";
import Button from "../../components/Button";
import SuccessIcon from "../../svgs/SuccessIcon";
import Error from "../../components/Error/Error";
import useSignUpPage from "./useSignUpPage";
import ReCaptcha from "react-google-recaptcha";
import OAuthButton from "../../components/OAuthButton/OAuthButton";

const SignUpPage = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    payload: { email: "", password: "", confirmPassword: "" },
    zodSchema: signUpSchema,
  });

  const { successMessage, submit, captchaRef } = useSignUpPage({ formReset: reset });

  return (
    <main className="flex w-full flex-col px-2">
      <div className="relative mx-auto mt-20 w-full max-w-[476px]">
        <Link to={"/"}>
          <img
            src="/images/logo-devlinks-large.svg"
            className="mx-auto mb-[51px]"
            width={183}
            height={40}
            alt=""
          />
        </Link>
        <Section
          title={!successMessage ? "Create account" : undefined}
          description={!successMessage ? "Let’s get you started sharing your links!" : undefined}
        >
          {successMessage && (
            <div className="flex flex-col gap-6 text-center">
              <SuccessIcon width={80} height={80} className="mx-auto text-green-500" />
              <div className="flex flex-col gap-2">
                <h1>Success</h1>
                <p>{successMessage}</p>
              </div>
            </div>
          )}
          {!successMessage && (
            <form onSubmit={(event) => handleSubmit(event, submit)}>
              {formState.responseError && (
                <Error message={formState.responseError} className="mb-4" />
              )}
              <div className="flex flex-col gap-6">
                <InputGroup
                  label={
                    <InputGroup.InputLabel htmlFor="email">Email address</InputGroup.InputLabel>
                  }
                  input={
                    <InputGroup.Input
                      {...register("email")}
                      id="email"
                      icon={<img src="/images/icon-email.svg" alt="" width={16} height={16} />}
                      placeholder="e.g. alex@email.com"
                      autoComplete="email"
                      autoFocus
                    />
                  }
                  error={
                    formState.fieldErrors?.email ? (
                      <InputGroup.InputError>{formState.fieldErrors.email}</InputGroup.InputError>
                    ) : null
                  }
                />
                <InputGroup
                  label={
                    <InputGroup.InputLabel htmlFor="password">
                      Create password
                    </InputGroup.InputLabel>
                  }
                  input={
                    <InputGroup.Input
                      {...register("password")}
                      id="password"
                      type="password"
                      icon={<img src="/images/icon-password.svg" alt="" width={16} height={16} />}
                      placeholder="Enter a password"
                    />
                  }
                  error={
                    formState.fieldErrors?.password ? (
                      <InputGroup.InputError>
                        {formState.fieldErrors.password}
                      </InputGroup.InputError>
                    ) : null
                  }
                />
                <InputGroup
                  label={
                    <InputGroup.InputLabel htmlFor="confirmPassword">
                      Confirm password
                    </InputGroup.InputLabel>
                  }
                  input={
                    <InputGroup.Input
                      {...register("confirmPassword")}
                      id="confirmPassword"
                      type="password"
                      icon={<img src="/images/icon-password.svg" alt="" width={16} height={16} />}
                      placeholder="Confirm your password"
                    />
                  }
                  error={
                    formState.fieldErrors?.confirmPassword ? (
                      <InputGroup.InputError>
                        {formState.fieldErrors.confirmPassword}
                      </InputGroup.InputError>
                    ) : null
                  }
                />

                <div className="flex flex-col">
                  <Button type="submit" disabled={formState.isLoading || !formState.isValid}>
                    {formState.isLoading ? "Loading..." : "Create new account"}
                  </Button>
                </div>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link className="text-primary" to={"/sign-in"}>
                    Login
                  </Link>
                </p>
                <ul className="mt-5 flex flex-col gap-2 border-t-2 border-zinc-100 pt-5">
                  <li>
                    <OAuthButton variant="github" disabled={formState.isLoading} onMouseUp={reset}>
                      Sign up with Github
                    </OAuthButton>
                  </li>
                </ul>
              </div>
            </form>
          )}
        </Section>
      </div>

      <ReCaptcha
        size="invisible"
        sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
        ref={captchaRef}
      />
    </main>
  );
};

export default SignUpPage;
