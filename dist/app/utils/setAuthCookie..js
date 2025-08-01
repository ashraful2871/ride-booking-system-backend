"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const setAuthCookie = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie("access", tokenInfo.accessToken, {
            httpOnly: true,
            secure: false,
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie("refresh", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: false,
        });
    }
};
exports.setAuthCookie = setAuthCookie;
