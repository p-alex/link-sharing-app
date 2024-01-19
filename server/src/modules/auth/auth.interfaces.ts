export interface IClientAuth {
  clientAuthData: {
    id: string;
    email: string;
    accessToken: string;
    sessionId: string;
  };
  refreshToken: string;
  refreshTokenExpireInMs: number;
}
