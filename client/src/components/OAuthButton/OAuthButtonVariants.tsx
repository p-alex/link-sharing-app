import { GithubIcon, LinkedInIcon } from "../../svgs";
import DiscordIcon from "../../svgs/DiscordIcon";
import GoogleIcon from "../../svgs/GoogleIcon";

export const OAUTH_BUTTON_VARIANTS = {
  github: {
    icon: <GithubIcon width={"1.125rem"} height={"1.125rem"} />,
    bg: "bg-github",
    text: "text-white",
    href:
      "https://github.com/login/oauth/authorize" +
      "?scope=user:email" +
      `&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`,
  },
  google: {
    icon: <GoogleIcon width={"1.125rem"} height={"1.125rem"} />,
    bg: "bg-google",
    text: "text-white",
    href:
      "https://accounts.google.com/o/oauth2/v2/auth" +
      "?response_type=code" +
      `&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${import.meta.env.VITE_SERVER_BASE_URL}/auth/google-sign-in` +
      "&scope=email" +
      "&access_type=offline",
  },
  linkedin: {
    icon: <LinkedInIcon width={"1.125rem"} height={"1.125rem"} />,
    bg: "bg-linkedin",
    text: "text-white",
    href:
      "https://www.linkedin.com/oauth/v2/authorization" +
      "?response_type=code" +
      `&client_id=${import.meta.env.VITE_LINKEDIN_CLIENT_ID}` +
      `&redirect_uri=${import.meta.env.VITE_SERVER_BASE_URL}/auth/linkedin-sign-in` +
      "&scope=openid email",
  },
  discord: {
    icon: <DiscordIcon width={"1.125rem"} height={"1.125rem"} />,
    bg: "bg-discord",
    text: "text-white",
    href:
      "https://discord.com/api/oauth2/authorize" +
      "?response_type=code" +
      `&client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}` +
      `&redirect_uri=${import.meta.env.VITE_SERVER_BASE_URL}/auth/discord-sign-in` +
      "&scope=email",
  },
};
