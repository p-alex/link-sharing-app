import { Link } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { SignInSchemaType, signInSchema } from "../schemas/user.schema";
import useAuthContext from "../authContext/useAuthContext";
import { emailSignInRequest } from "../apiRequests/auth";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import Section from "../components/Section";
import OAuthButton from "../components/OAuthButton/OAuthButton";
import Button from "../components/Button";
import Error from "../components/Error/Error";

const SignInPage = () => {
  const navigate = useNavigate();

  const { register, formState, reset, handleSubmit } = useForm({
    payload: { email: "", password: "" },
    zodSchema: signInSchema,
  });

  const { dispatchAuth } = useAuthContext();

  const submit = async (formData: SignInSchemaType) => {
    const { success, data } = await emailSignInRequest(formData);
    if (success && data) {
      reset();
      dispatchAuth({ type: "LOGIN", payload: data });
      navigate("/");
    }
  };

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
              <p className="text-center">
                Don't have an account?{" "}
                <Link className="text-primary" to={"/sign-up"}>
                  Create account
                </Link>
              </p>
              <ul className="mt-5 flex flex-col gap-2 border-t-2 border-zinc-100 pt-5">
                <li>
                  <OAuthButton variant="google" disabled={formState.isLoading} onMouseUp={reset}>
                    Log In with Google
                  </OAuthButton>
                </li>
                <li>
                  <OAuthButton variant="github" disabled={formState.isLoading} onMouseUp={reset}>
                    Log In with Github
                  </OAuthButton>
                </li>
                <li>
                  <OAuthButton variant="discord" disabled={formState.isLoading} onMouseUp={reset}>
                    Log In with Discord
                  </OAuthButton>
                </li>
                <li>
                  <OAuthButton variant="linkedin" disabled={formState.isLoading} onMouseUp={reset}>
                    Log In with LinkedIn
                  </OAuthButton>
                </li>
              </ul>
            </div>
          </form>
        </Section>
      </div>
    </main>
  );
};

export default SignInPage;
