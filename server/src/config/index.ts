export const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV! as "development" | "production",
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL!,
  SERVER_BASE_URL: process.env.SERVER_BASE_URL!,
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: Number(process.env.DB_PORT!),
  DB_USER: process.env.DB_USER!,
  DB_PASS: process.env.DB_PASS!,
  DB_NAME: process.env.DB_NAME!,
  PASSWORD_SALT_ROUNDS: Number(process.env.PASSWORD_SALT_ROUNDS!),
  SECURE_PASSWORD_GENERATOR_LENGTH: Number(process.env.SECURE_PASSWORD_GENERATOR_LENGTH!),
  SECURE_PASSWORD_CHARACTERS: process.env.SECURE_PASSWORD_CHARACTERS!,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID!,
  LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET!,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID!,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY!,
  MAILJET_API_KEY: process.env.MAILJET_API_KEY!,
  MAILJET_API_SECRET: process.env.MAILJET_API_SECRET!,
  SMTP_SENDER: process.env.SMTP_SENDER!,
  CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY!,
  CAPTCHA_SECRET_KEY: process.env.CAPTCHA_SECRET_KEY!,
  jwtSecrets: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
    REFRESH_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
    EMAIL_VERIFICATION_TOKEN_SECRET: process.env.EMAIL_VERIFICATION_TOKEN_SECRET!,
    RESET_PASSWORD_VERIFICATION_TOKEN_SECRET: process.env.RESET_PASSWORD_VERIFICATION_TOKEN_SECRET!,
    SECURITY_CODE_VERIFICATION_TOKEN_SECRET: process.env.SECURITY_CODE_VERIFICATION_TOKEN_SECRET!,
  },
  CIPHER_ALGORITHM: process.env.CIPHER_ALGORITHM!,
  FASTHASH_ALGORITHM: process.env.FASTHASH_ALGORITHM!,
  cipherKeys: {
    REFRESH_TOKEN_CIPHER_KEY: process.env.REFRESH_TOKEN_CIPHER_KEY!,
    ACCESS_TOKEN_CIPHER_KEY: process.env.ACCESS_TOKEN_CIPHER_KEY!,
    EMAIL_VERIFICATION_CIPHER_KEY: process.env.EMAIL_VERIFICATION_CIPHER_KEY!,
  },
  cloudinary: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  },
};
