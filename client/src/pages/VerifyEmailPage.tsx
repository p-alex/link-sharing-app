import { Link, useNavigate } from "react-router-dom";
import { VerifyEmailType } from "../schemas/auth.schema";
import { verifyEmailRequest } from "../apiRequests/auth";
import { useRef, useState, useCallback, useEffect } from "react";
import { AxiosError } from "axios";
import Button from "../components/Button";
import Section from "../components/Section";
import { tokenSchema } from "../schemas/common.schema";
import SuccessIcon from "../svgs/SuccessIcon";
import Error from "../components/Error/Error";
import getParamFromUrl from "../utils/getParamFromUrl";

const VerifyEmailPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleVerify = useCallback(async (data: VerifyEmailType) => {
    try {
      const { success } = await verifyEmailRequest({ token: data.token });
      if (success) {
        setSuccess(success);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.errors[0]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const validateToken = useCallback((token: string) => {
    if (!tokenSchema.safeParse(token).success) return null;
    return token;
  }, []);

  const effectRan = useRef<boolean>(false);

  useEffect(() => {
    if (effectRan.current === true) {
      const token = getParamFromUrl("token");
      if (!token) return navigate("/sign-in");
      const validToken = validateToken(token);
      if (!validToken) return navigate("/sign-in");
      handleVerify({ token });
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

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
        <Section>
          <div className="flex justify-center">
            {isLoading && <p>Verifying...</p>}
            {!isLoading && success && (
              <div className="flex flex-col gap-6">
                <SuccessIcon width={80} height={80} className="mx-auto text-green-500" />
                <div className="flex flex-col gap-4">
                  <h1>Email verified</h1>
                  <Button onClick={() => (window.location.href = "/sign-in")}>
                    Go to Login Page
                  </Button>
                </div>
              </div>
            )}
            {!isLoading && !success && <Error message={error} />}
          </div>
        </Section>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
