import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  BCRYPT_SALT_ROUND: string;
}

const loadEnvVariable = (): EnvConfig => {
  const requireEnvVariable: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "BCRYPT_SALT_ROUND",
  ];
  requireEnvVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error("Missing required Env Variable");
    }
  });
  return {
    PORT: process.env.PORT as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
  };
};

export const envVars = loadEnvVariable();
