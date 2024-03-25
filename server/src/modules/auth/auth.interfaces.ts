import Profile from "../profile/profile.entity";

export interface IAuthData {
  id: string;
  email: string;
  accessToken: string;
  sessionId: string;
}

export interface IClientAuth {
  authData: IAuthData;
  profileData: Profile;
  refreshToken: string;
  refreshTokenExpireInMs: number;
}
