export const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV! as "development" | "production",
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: Number(process.env.DB_PORT!),
  DB_USER: process.env.DB_USER!,
  DB_PASS: process.env.DB_PASS!,
  DB_NAME: process.env.DB_NAME!,
};
