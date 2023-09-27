import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchemaType, signInSchema } from "../schemas/user.schema";
import useAuthContext from "../authContext/useAuthContext";
import { emailSignInRequest } from "../apiRequests/auth";
import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import AuthProviderList from "../components/OAuthList/OAuthList";
import OAuthListProvider from "../components/OAuthList/OAuthListContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<SignInSchemaType>({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const { setAuthState } = useAuthContext();

  const submit = async (formData: SignInSchemaType) => {
    try {
      const { success, data } = await emailSignInRequest(formData);
      if (success && data) {
        reset();
        setSuccessMessage("Your account was created successfully!");
        setAuthState((prevState) => ({ ...prevState, ...data }));
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.errors[0]);
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    }
  };

  return (
    <main className="flex w-full flex-col">
      <div className="relative mx-auto mt-20 w-full max-w-[476px]">
        <img
          src="/images/logo-devlinks-large.svg"
          className="mx-auto mb-[51px]"
          width={183}
          height={40}
          alt=""
        />
        <form
          className="flex flex-col gap-10 rounded-[12px] bg-white p-10"
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <header className="flex flex-col gap-2">
            <h1 className="text-darkGray text-[32px] font-bold leading-[48px]">Login</h1>
            <p className="text-gray text-base">Add your details below to get back into the app</p>
          </header>
          {error && <p className="bg-error rounded-lg px-4 py-2 text-white">{error}</p>}
          {successMessage && <p>{successMessage}</p>}
          <div className="flex flex-col gap-6">
            <InputGroup
              label={<InputGroup.InputLabel htmlFor="email">Email address</InputGroup.InputLabel>}
              input={
                <InputGroup.Input
                  {...register("email")}
                  id="email"
                  type="email"
                  icon={<img src="/images/icon-email.svg" width={16} height={16} alt="" />}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              }
              error={
                errors.email?.message ? (
                  <InputGroup.InputError>{errors.email.message}</InputGroup.InputError>
                ) : null
              }
            />
            <InputGroup
              label={<InputGroup.InputLabel htmlFor="password">Password</InputGroup.InputLabel>}
              input={
                <InputGroup.Input
                  {...register("password")}
                  id="password"
                  type="password"
                  icon={<img src="/images/icon-password.svg" width={16} height={16} alt="" />}
                  placeholder="Enter your password"
                />
              }
              error={
                errors.password?.message ? (
                  <InputGroup.InputError>{errors.password.message}</InputGroup.InputError>
                ) : null
              }
            />
            <Button disabled={isSubmitting}>Login</Button>
            <p className="text-center">
              Don't have an account?{" "}
              <Link className="text-primary" to={"/sign-up"}>
                Create account
              </Link>
            </p>
          </div>
          <OAuthListProvider>
            <AuthProviderList />
          </OAuthListProvider>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
