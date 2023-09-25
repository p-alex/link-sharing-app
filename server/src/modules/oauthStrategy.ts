import axios from "axios";
import { config } from "../config";
import { injectable } from "inversify";
import urlEncode from "../utils/urlEncode";

@injectable()
class OAuthStrategy {
  constructor() {}

  async github(code: string): Promise<{ email: string }> {
    const getAccessToken = await axios.post<string>(
      "https://github.com/login/oauth/access_token",
      {
        client_id: config.GITHUB_CLIENT_ID,
        client_secret: config.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { "Content-Type": "application/json" } },
    );

    const accessToken = getAccessToken.data.split("&")[0].split("=")[1];

    const userData = await axios.get<{ email: string }>(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { email: userData.data.email };
  }

  async google(code: string): Promise<{ email: string }> {
    const getAccessToken = await axios.post<{ access_token: string }>(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: config.GOOGLE_CLIENT_ID,
        client_secret: config.GOOGLE_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:5000/api/v1/auth/google-sign-in",
      },
    );

    const userData = await axios.get<{
      id: string;
      email: string;
      verified_email: boolean;
      picture: string;
    }>("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
      headers: {
        Authorization: `Bearer ${getAccessToken.data.access_token}`,
      },
    });

    return { email: userData.data.email };
  }

  async linkedin(code: string): Promise<{ email: string }> {
    const getAccessToken = await axios.post<{
      access_token: string;
      expires_in: number;
      scope: string;
    }>(
      "https://www.linkedin.com/oauth/v2/accessToken",
      urlEncode({
        grant_type: "authorization_code",
        code,
        client_id: config.LINKEDIN_CLIENT_ID,
        client_secret: config.LINKEDIN_CLIENT_SECRET,
        redirect_uri: "http://localhost:5000/api/v1/auth/linkedin-sign-in",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    const userData = await axios.get<{ email: string }>("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${getAccessToken.data.access_token}` },
    });
    return { email: userData.data.email };
  }

  async discord(code: string): Promise<{ email: string }> {
    const getAccessToken = await axios.post<{
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
    }>(
      "https://discord.com/api/oauth2/token",
      urlEncode({
        grant_type: "authorization_code",
        code,
        client_id: config.DISCORD_CLIENT_ID,
        client_secret: config.DISCORD_CLIENT_SECRET,
        redirect_uri: "http://localhost:5000/api/v1/auth/discord-sign-in",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    const userData = await axios.get<{ email: string }>("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${getAccessToken.data.access_token}` },
    });
    return { email: userData.data.email };
  }
}

export default OAuthStrategy;
