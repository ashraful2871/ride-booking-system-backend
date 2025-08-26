import { Response } from "express";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}
const isProduction = process.env.NODE_ENV === "production";
export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (tokenInfo.accessToken) {
    res.cookie("access", tokenInfo.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
  }
  if (tokenInfo.refreshToken) {
    res.cookie("refresh", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
  }
};
