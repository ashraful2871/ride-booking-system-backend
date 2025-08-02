import { envVars } from "../../config/env";
import { IAuthProvider, IUser } from "./user.interface";
import bcryptjs from "bcryptjs";
import { User } from "./user.model";
import AppError from "../../errorHelper/appError";
import { StatusCodes } from "http-status-codes";
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email: email });
  if (isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist");
  }
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
