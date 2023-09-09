import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchemaType, signUpSchema } from "../schemas/user.schema";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const submit = (data: SignUpSchemaType) => {
    console.log({ email: data.email, password: data.password });
  };

  return (
    <main className="w-full flex flex-col">
      <div className="relative mx-auto w-full max-w-[476px] mt-20">
        <img
          src="/images/logo-devlinks-large.svg"
          className="mb-[51px] mx-auto"
          width={183}
          height={40}
          alt=""
        />
        <form
          className="flex flex-col gap-10 p-10 bg-white rounded-[12px]"
          onSubmit={handleSubmit(submit)}
          noValidate={true}
        >
          <header className="flex flex-col gap-2">
            <h1 className="text-[32px] leading-[48px] text-darkGray font-bold">Create account</h1>
            <p className="text-gray text-base">Let's get you started sharing your links!</p>
          </header>
          <div className="flex flex-col gap-6">
            <InputGroup
              label={<InputGroup.InputLabel htmlFor="email">Email address</InputGroup.InputLabel>}
              input={
                <InputGroup.Input
                  {...register("email")}
                  id="email"
                  icon={<img src="/images/icon-email.svg" width={16} height={16} alt="" />}
                  placeholder="e.g. alex@email.com"
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
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Create new account
            </Button>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-primary" to={"/sign-in"}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
