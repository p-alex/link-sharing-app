export const OAUTH_BUTTON_VARIANTS = {
  github: {
    icon: "/images/github-icon.svg",
    bg: "bg-github",
    text: "text-white",
    href: "https://github.com/login/oauth/authorize?scope=user:email&client_id=82dfd29223c5e3189096",
  },
  google: {
    icon: "/images/google-icon.svg",
    bg: "bg-google",
    text: "text-white",
    href:
      "https://accounts.google.com/o/oauth2/v2/auth" +
      "?client_id=315135216413-5mol4o880svh2hb5u1opgtd5l56mm83f.apps.googleusercontent.com" +
      "&redirect_uri=http://localhost:5000/api/v1/auth/google-sign-in" +
      "&response_type=code" +
      "&access_type=offline" +
      "&scope=email",
  },
  linkedin: {
    icon: "/images/linkedin-icon.svg",
    bg: "bg-linkedin",
    text: "text-white",
    href:
      "https://www.linkedin.com/oauth/v2/authorization" +
      "?response_type=code" +
      "&client_id=77wnshbt9a9ej2" +
      "&redirect_uri=http://localhost:5000/api/v1/auth/linkedin-sign-in" +
      "&scope=openid email",
  },
  discord: {
    icon: "/images/discord-icon.svg",
    bg: "bg-discord",
    text: "text-white",
    href:
      "https://discord.com/api/oauth2/authorize" +
      "?client_id=1155817544108756994" +
      "&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fauth%2Fdiscord-sign-in" +
      "&response_type=code" +
      "&scope=email",
  },
};