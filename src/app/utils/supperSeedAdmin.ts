/* eslint-disable no-console */
import { envVars } from "../config/env";
import {
  IAuthProvider,
  IsActive,
  IUser,
  Role,
} from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";
const superAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });
    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }
    const autProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };
    const hasPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const payload: IUser = {
      name: "Super Admin",
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hasPassword,
      isActive: IsActive.Active,
      isDeleted: false,
      role: Role.SUPER_ADMIN,
      auth: [autProvider],
    };
    const superAdmin = await User.create(payload);
    console.log("Super Admin Created Successfully \n");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};

export default superAdmin;
