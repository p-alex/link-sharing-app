import axios from "axios";
import { config } from "../../config";
import { injectable } from "inversify";
import objectUrlEncode from "../../utils/objectUrlEncode";
import { OAuthProvidersType } from "../user/user.entity";

@injectable()
class OAuthStrategy {
  constructor() {}

  async github(code: string) {
    const getAccessToken = await axios.post<string>(
      "https://github.com/login/oauth/access_token",
      this.makeAccessTokenRequestPayload(code, "github"),
    );

    const userData = await axios.get<{ email: string }>(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${getAccessToken.data.split("&")[0].split("=")[1]}`,
      },
    });

    return { email: userData.data.email };
  }

  async google(code: string) {
    const getAccessToken = await axios.post<{ access_token: string }>(
      "https://oauth2.googleapis.com/token",
      this.makeAccessTokenRequestPayload(code, "google"),
    );

    const userData = await axios.get<{ email: string }>(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${getAccessToken.data.access_token}`,
        },
      },
    );

    return { email: userData.data.email };
  }

  async linkedin(code: string) {
    const getAccessToken = await axios.post<{ access_token: string }>(
      "https://www.linkedin.com/oauth/v2/accessToken",
      objectUrlEncode(this.makeAccessTokenRequestPayload(code, "linkedin")),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    const userData = await axios.get<{ email: string }>("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${getAccessToken.data.access_token}` },
    });

    return { email: userData.data.email };
  }

  async discord(code: string) {
    const getAccessToken = await axios.post<{ access_token: string }>(
      "https://discord.com/api/oauth2/token",
      objectUrlEncode(this.makeAccessTokenRequestPayload(code, "discord")),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    const userData = await axios.get<{ email: string }>("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${getAccessToken.data.access_token}` },
    });

    return { email: userData.data.email };
  }

  private makeAccessTokenRequestPayload(code: string, type: OAuthProvidersType) {
    return {
      code,
      client_id: config[`${type.toUpperCase()}_CLIENT_ID` as keyof typeof config] as string,
      client_secret: config[`${type.toUpperCase()}_CLIENT_SECRET` as keyof typeof config] as string,
      grant_type: "authorization_code",
      redirect_uri: `${config.SERVER_BASE_URL}/auth/${type}-sign-in`,
    };
  }
}

export default OAuthStrategy;
