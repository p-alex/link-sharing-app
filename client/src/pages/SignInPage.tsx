import { Link } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { signInSchema } from "../schemas/user.schema";
import useForm from "../hooks/useForm";
import Section from "../components/Section";
import OAuthButton from "../components/OAuthButton/OAuthButton";
import Button from "../components/Button";
import Error from "../components/Error/Error";
import useSignInPage from "../hooks/useSignInPage";
import ReCaptcha from "react-google-recaptcha";

const SignInPage = () => {
  const { register, formState, reset, handleSubmit } = useForm({
    payload: { email: "", password: "" },
    zodSchema: signInSchema,
  });

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
            {formState.responseError && (
              <Error message={formState.responseError} className="mb-4" />
            )}
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
                  />
                }
                error={
                  formState.fieldErrors?.password ? (
                    <InputGroup.InputError>{formState.fieldErrors?.password}</InputGroup.InputError>
                  ) : null
                }
              />

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

              <ul className="mt-5 flex flex-col gap-2 border-t-2 border-zinc-100 pt-5">
                <li>
                  <OAuthButton variant="github" disabled={formState.isLoading} onMouseUp={reset}>
                    Log In with Github
                  </OAuthButton>
                </li>
              </ul>
            </div>
          </form>
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

export default SignInPage;
