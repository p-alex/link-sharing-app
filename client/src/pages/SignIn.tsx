import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchemaType, signInSchema } from "../schemas/user.schema";
import useAuthContext from "../authContext/useAuthContext";

const SignIn = () => {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm<SignInSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const { dispatchAuth } = useAuthContext();

  const submit = (data: SignInSchemaType) => {
    console.log(data);
    dispatchAuth({
      type: "LOGIN",
      payload: {
        id: "hello",
        email: "hello@gmail.com",
        profile_picture: "image.png",
        access_token: "aspfnewon3o2p5b",
      },
    });
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
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <header className="flex flex-col gap-2">
            <h1 className="text-[32px] leading-[48px] text-darkGray font-bold">Login</h1>
            <p className="text-gray text-base">Add your details below to get back into the app</p>
          </header>
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
            <Button disabled={!isValid || isSubmitting}>Login</Button>
            <p className="text-center">
              Don't have an account?{" "}
              <Link className="text-primary" to={"/sign-up"}>
                Create account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
