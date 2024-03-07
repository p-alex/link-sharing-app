import { useCallback, useEffect, useState } from "react";
import { ZodSchema, ZodError } from "zod";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addPopupAction } from "../redux/features/globalPopupsSlice/globalPopupsSlice";

type ErrorsType<TPayload> = {
  [Property in keyof TPayload]: string;
};

function useForm<
  TPayload extends { [key: string]: string | number | readonly string[] | undefined },
  TSchema extends ZodSchema | undefined,
>({ payload, zodSchema }: { payload: TPayload; zodSchema: TSchema }) {
  const dispatch = useDispatch();
  const [data, setData] = useState<TPayload>(payload);
  const [responseError, setResponseError] = useState("");

  const [focusedInputs, setFocusedInputs] = useState<{ [Property in keyof typeof data]: boolean }>(
    createFocusedInputsObject(),
  );

  const [fieldErrors, setFieldErrors] = useState<ErrorsType<TPayload> | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const isValid = fieldErrors === null;

  function createFocusedInputsObject() {
    const keys = Object.keys(data);
    return keys.reduce(
      (acc, curr) => {
        const currentKey = curr as keyof typeof data;
        acc[currentKey] = false;
        return acc;
      },
      {} as { [Property in keyof typeof data]: boolean },
    );
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));

  const register = useCallback(
    (key: keyof typeof payload): React.InputHTMLAttributes<HTMLInputElement> => {
      return {
        onChange: onInputChange,
        value: data[key],
        name: key.toString(),
        id: key.toString(),
        onFocus: (event: React.FocusEvent<HTMLInputElement>) =>
          setFocusedInputs((prevState) => ({ ...prevState, [event.target.name]: true })),
        "aria-invalid": fieldErrors && fieldErrors[key] ? true : false,
      };
    },
    [data, fieldErrors],
  );

  const handleSetErrors = useCallback(
    (error: ZodError) => {
      const err = error.issues.reduce((acc, curr) => {
        const currentKey = curr.path[0] as keyof ErrorsType<TPayload>;
        const keyInFocusedInputs = Object.keys(focusedInputs).find(
          (key) => key === currentKey,
        ) as keyof typeof payload;
        if (keyInFocusedInputs) {
          if (focusedInputs[keyInFocusedInputs]) {
            acc[currentKey] = curr.message;
          }
        }
        return acc;
      }, {} as ErrorsType<TPayload>);
      setFieldErrors(err);
    },
    [focusedInputs],
  );

  const handleValidate = () => {
    try {
      if (zodSchema) {
        zodSchema.parse(data);
      }
      setFieldErrors(null);
    } catch (error) {
      if (error instanceof ZodError) {
        handleSetErrors(error);
      }
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    submitFunc: (data: TPayload) => Promise<void>,
  ) => {
    event.preventDefault();
    if (!isValid) return;
    try {
      setIsLoading(true);
      await submitFunc(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          dispatch(
            addPopupAction({ type: "error", message: "Something went wrong. Try again later." }),
          );
          return;
        }
        const errorMessages = error.response?.data.errors;
        setResponseError(errorMessages[0]);
        dispatch(addPopupAction({ type: "error", message: errorMessages[0] }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(payload);
    setFieldErrors(null);
    setFocusedInputs(createFocusedInputsObject());
  };

  useEffect(() => {
    handleValidate();
    setResponseError("");
  }, [data]);

  return {
    register,
    formState: {
      fieldErrors,
      isValid,
      isLoading,
      responseError,
    },
    handleSubmit,
    reset,
  };
}

export default useForm;
