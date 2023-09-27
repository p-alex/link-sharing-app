import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchemaType, signUpSchema } from "../schemas/user.schema";
import { createUser } from "../apiRequests/users";
import { useState } from "react";
import { AxiosError } from "axios";
import AuthProviderList from "../components/OAuthList/OAuthList";
import OAuthListProvider from "../components/OAuthList/OAuthListContext";

const SignUp = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const submit = async (data: SignUpSchemaType) => {
    try {
      const { success } = await createUser(data);
      if (success) {
        setSuccessMessage("Your account was created successfully!");
        reset();
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
          onSubmit={handleSubmit(submit)}
          noValidate={true}
        >
          <header className="flex flex-col gap-2">
            <h1 className="text-darkGray text-[32px] font-bold leading-[48px]">Create account</h1>
            <p className="text-gray text-base">Let's get you started sharing your links!</p>
          </header>
          {error && <p>{error}</p>}
          {successMessage && <p>{successMessage}</p>}
          <div className="flex flex-col gap-6">
            <InputGroup
              label={<InputGroup.InputLabel htmlFor="email">Email address</InputGroup.InputLabel>}
              input={
                <InputGroup.Input
                  {...register("email")}
                  id="email"
                  icon={<img src="/images/icon-email.svg" width={16} height={16} alt="" />}
                  placeholder="e.g. alex@email.com"
                  autoComplete="email"
                />
              }
              error={
                errors.email?.message ? (
                  <InputGroup.InputError>{errors.email.message!}</InputGroup.InputError>
                ) : null
              }
            />
            <InputGroup
              label={
                <InputGroup.InputLabel htmlFor="password">Create password</InputGroup.InputLabel>
              }
              input={
                <InputGroup.Input
                  {...register("password")}
                  id="password"
                  type="password"
                  icon={<img src="/images/icon-password.svg" width={16} height={16} alt="" />}
                  placeholder="Enter a password"
                />
              }
              error={
                errors.password?.message ? (
                  <InputGroup.InputError>{errors.password.message}</InputGroup.InputError>
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
                  icon={<img src="/images/icon-password.svg" width={16} height={16} alt="" />}
                  placeholder="Confirm your password"
                />
              }
              error={
                errors.confirmPassword?.message ? (
                  <InputGroup.InputError>{errors.confirmPassword.message}</InputGroup.InputError>
                ) : null
              }
            />

            <Button type="submit" disabled={isSubmitting}>
              Create new account
            </Button>

            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-primary" to={"/sign-in"}>
                Login
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

export default SignUp;
