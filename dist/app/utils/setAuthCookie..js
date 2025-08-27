"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const setAuthCookie = (res, tokenInfo) => {
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
exports.setAuthCookie = setAuthCookie;
