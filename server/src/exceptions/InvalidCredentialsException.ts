class InvalidCredentialsException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default InvalidCredentialsException;
