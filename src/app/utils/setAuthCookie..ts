import { Response } from "express";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (tokenInfo.accessToken) {
    res.cookie("access", tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // domain: "ride-booking-a725a.web.app",
      // path: "/",
    });
  }
  if (tokenInfo.refreshToken) {
    res.cookie("refresh", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // domain: "ride-booking-a725a.web.app",
      // path: "/",
    });
  }
};
