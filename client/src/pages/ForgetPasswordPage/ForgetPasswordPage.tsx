import { Link } from "react-router-dom";
import Section from "../../components/Section";
import useForm from "../../hooks/useForm";
import { forgetPasswordSchema } from "../../schemas/user.schema";
import Error from "../../components/Error/Error";
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import useForgetPasswordPage from "./useForgetPasswordPage";
import ReCAPTCHA from "react-google-recaptcha";

const ForgetPasswordPage = () => {
  const { formState, reset, register, handleSubmit } = useForm({
    payload: { email: "" },
    zodSchema: forgetPasswordSchema,
  });

  const { success, submit, captchaRef } = useForgetPasswordPage({ formReset: reset });

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
        <Section
          title={!success ? "Forget password" : undefined}
          description={
            !success ? "Please provide your email so we can send a confirmation email" : undefined
          }
        >
          {!success && (
            <form onSubmit={(event) => handleSubmit(event, submit)} noValidate>
              {formState.responseError && (
                <Error message={formState.responseError} className="mb-4" />
              )}
              <div className="flex flex-col gap-6">
                <InputGroup
                  label={<InputGroup.InputLabel htmlFor="email">Email</InputGroup.InputLabel>}
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

                <div className="flex flex-col">
                  <Button type="submit" disabled={formState.isLoading || !formState.isValid}>
                    {formState.isLoading ? "Loading..." : "Send confirmation email"}
                  </Button>
                </div>
              </div>
            </form>
          )}
          {success && (
            <p>We sent you a confirmation email if this email address exists. Check your inbox.</p>
          )}
        </Section>
      </div>

      <ReCAPTCHA
        size="invisible"
        sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
        ref={captchaRef}
      />
    </main>
  );
};

export default ForgetPasswordPage;
