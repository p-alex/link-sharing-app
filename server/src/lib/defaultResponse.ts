class DefaultResponse<TData> {
  constructor(
    public readonly success: boolean = false,
    public readonly statusCode: number = 200,
    public readonly data?: TData,
    public readonly errors?: string[],
  ) {}
}

export default DefaultResponse;
