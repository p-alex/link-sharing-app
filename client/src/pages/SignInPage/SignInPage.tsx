import { Link } from "react-router-dom";
import InputGroup from "../../components/InputGroup";
import { signInSchema } from "../../schemas/user.schema";
import useForm from "../../hooks/useForm";
import Section from "../../components/Section";
import Button from "../../components/Button";
import Error from "../../components/Error/Error";
import useSignInPage from "./useSignInPage";
import useRedirectIfSignedIn from "../../hooks/useRedirectIfSignedIn";
import Captcha from "../../components/Captcha";
import CaptchaPrivacyAndTerms from "../../components/Captcha/CaptchaPrivacyAndTerms/CaptchaPrivacyAndTerms";

const SignInPage = () => {
  const { register, formState, reset, handleSubmit } = useForm({
    payload: { email: "", password: "" },
    zodSchema: signInSchema,
  });

  useRedirectIfSignedIn({});

  const { submit, oauthError, captchaRef } = useSignInPage({
    resetForm: reset,
  });

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
        <Section title="Login" description="Add your details below to get back into the app">
          <form onSubmit={(event) => handleSubmit(event, submit)}>
            {oauthError && <Error message={oauthError} className="mb-4" />}
            <div className="flex flex-col gap-6">
              <InputGroup
                label={<InputGroup.InputLabel htmlFor="email">Email address</InputGroup.InputLabel>}
                input={
                  <InputGroup.Input
                    {...register("email")}
                    icon={<img src="/images/icon-email.svg" alt="" width={16} height={16} />}
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    autoFocus
                  />
                }
                error={
                  formState.fieldErrors?.email ? (
                    <InputGroup.InputError>{formState.fieldErrors?.email}</InputGroup.InputError>
                  ) : null
                }
              />
              <InputGroup
                label={<InputGroup.InputLabel htmlFor="password">Password</InputGroup.InputLabel>}
                input={
                  <InputGroup.Input
                    {...register("password")}
                    icon={<img src="/images/icon-password.svg" alt="" width={16} height={16} />}
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                }
                error={
                  formState.fieldErrors?.password ? (
                    <InputGroup.InputError>{formState.fieldErrors?.password}</InputGroup.InputError>
                  ) : null
                }
              />
              <Captcha captchaRef={captchaRef} />
              <div className="flex flex-col">
                <Button type="submit" disabled={formState.isLoading || !formState.isValid}>
                  {formState.isLoading ? "Loading..." : "Login"}
                </Button>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link className="text-primary" to={"/sign-up"}>
                    Create account
                  </Link>
                </p>
                <Link className="text-primary" to={"/forget-password"}>
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
        </Section>
        <CaptchaPrivacyAndTerms />
      </div>
    </main>
  );
};

export default SignInPage;
