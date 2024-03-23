import { useCallback, useEffect, useState } from "react";
import { getFileDataUrl } from "../utils/getFileDataUrl";
import { ZodError, ZodSchema } from "zod";

function useFormV2<TPayload extends object, TZodSchema extends ZodSchema>(
  payload: TPayload,
  zodSchema: TZodSchema,
) {
  const [formData, setFormData] = useState<TPayload>(payload);
  const [focusedInputs, setFocusedInputs] = useState<{ [Property in keyof TPayload]: boolean }>(
    createFocusedInputsObject(payload),
  );
  const [fieldErrors, setFieldErrors] = useState<{ [Property in keyof TPayload]: string } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    const fileDataUrl = await getFileDataUrl(file);
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: fileDataUrl,
    }));
  };

  const handleInputFocus = (key: keyof TPayload) => {
    setFocusedInputs((prevState) => ({ ...prevState, [key]: true }));
  };

  const register = (key: keyof TPayload) => ({
    id: key.toString(),
    name: key.toString(),
    onFocus: () => handleInputFocus(key),
    "aria-invalid": fieldErrors && fieldErrors[key] ? true : false,
  });

  const registerInput = (key: keyof TPayload): React.InputHTMLAttributes<HTMLInputElement> => ({
    onChange: handleInputChange,
    value: formData[key] as string,
    ...register(key),
  });

  const registerSingleFileInput = (
    key: keyof TPayload,
  ): React.InputHTMLAttributes<HTMLInputElement> => ({
    onChange: handleFileInputChange,
    ...register(key),
  });

  const handleSubmit = async (
    event: React.FormEvent,
    submitFunc: (formState: TPayload) => Promise<void>,
  ) => {
    event.preventDefault();
    const isValid = fieldErrors === null;
    if (!isValid) return;
    setIsLoading(true);
    try {
      await submitFunc(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetFieldErrors = useCallback(
    (zodError: ZodError) => {
      const errors = zodError.issues.reduce(
        (acc, curr) => {
          const key = curr.path[0] as keyof TPayload;
          const shouldSetError = focusedInputs[key] === true && formData[key] !== "";
          if (!shouldSetError) return acc;
          acc[key] = curr.message;
          return acc;
        },
        {} as { [Property in keyof TPayload]: string },
      );
      setFieldErrors(errors);
    },
    [focusedInputs, formData],
  );

  const handleValidate = useCallback(() => {
    try {
      zodSchema.parse(formData);
      setFieldErrors(null);
    } catch (error: unknown) {
      if (error instanceof ZodError) handleSetFieldErrors(error);
    }
  }, [formData, handleSetFieldErrors, zodSchema]);

  function createFocusedInputsObject(payload: TPayload) {
    return Object.keys(payload).reduce(
      (acc, curr) => {
        const key = curr as keyof TPayload;
        acc[key] = false;
        return acc;
      },
      {} as { [Property in keyof TPayload]: boolean },
    );
  }

  const reset = () => {
    setFormData(payload);
    setFieldErrors(null);
    setFocusedInputs(createFocusedInputsObject(payload));
  };

  useEffect(() => {
    handleValidate();
  }, [formData, handleValidate]);

  return {
    registerInput,
    registerSingleFileInput,
    handleSubmit,
    formState: {
      formData,
      fieldErrors,
      isLoading,
      isValid: fieldErrors === null,
    },
    reset,
  };
}

export default useFormV2;
