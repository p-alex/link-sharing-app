import { Link } from "react-router-dom";
import Button from "../components/Button";
import Section from "../components/Section";
import SuccessIcon from "../svgs/SuccessIcon";
import Error from "../components/Error/Error";
import useVerifyEmailPage from "../hooks/useVerifyEmailPage";

const VerifyEmailPage = () => {
  const { error, step } = useVerifyEmailPage();

  return (
    <main className="flex w-full flex-col">
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

        {step === "confirm_token_step" && (
          <Section>
            <p>Verifying...</p>
          </Section>
        )}

        {step === "error_step" && (
          <Section>
            <Error message={error} />
          </Section>
        )}

        {step === "success_step" && (
          <Section>
            <div className="flex flex-col gap-6 text-center">
              <SuccessIcon width={80} height={80} className="mx-auto text-green-500" />
              <div className="flex flex-col gap-4">
                <h1>Email verified</h1>
                <Button onClick={() => (window.location.href = "/sign-in")}>
                  Go to Login Page
                </Button>
              </div>
            </div>
          </Section>
        )}
      </div>
    </main>
  );
};

export default VerifyEmailPage;
