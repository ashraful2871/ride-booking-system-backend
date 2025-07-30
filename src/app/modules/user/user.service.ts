import { envVars } from "../../config/env";
import { IAuthProvider, IUser } from "./user.interface";
import bcryptjs from "bcryptjs";
import { User } from "./user.model";
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const hasPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hasPassword,
    auth: [authProvider],
    ...rest,
  });
  return user;
};

export const userServices = {
  createUser,
};
