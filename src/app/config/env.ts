import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
}

const loadEnvVariable = (): EnvConfig => {
  const requireEnvVariable: string[] = ["PORT", "DB_URL", "NODE_ENV"];
  requireEnvVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error("Missing required Env Variable");
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as string,
  };
};

export const envVars = loadEnvVariable();
