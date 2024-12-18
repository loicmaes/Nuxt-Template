import type { HttpRequest } from "~/types/http";

const cookiesOptions = {
  httpOnly: true,
  secure: false, // update for production mode
};

const tokenCookieKey = "auth-token";
const userUidCookieKey = "user-uid";

export function setTokenCookie(event: HttpRequest, token: string | null) {
  return setCookie(event, tokenCookieKey, token ?? "", cookiesOptions);
}
export function setUserUidCookie(event: HttpRequest, userUid: string | null) {
  return setCookie(event, userUidCookieKey, userUid ?? "", cookiesOptions);
}
export function setCookies(event: HttpRequest, payload: {
  token: string | null;
  userUid: string | null;
}) {
  setTokenCookie(event, payload.token);
  setUserUidCookie(event, payload.userUid);
}

export function getTokenCookie(event: HttpRequest): (string | undefined) {
  return getCookie(event, tokenCookieKey);
}
export function getUserUidCookie(event: HttpRequest): (string | undefined) {
  return getCookie(event, userUidCookieKey);
}
export function getCookies(event: HttpRequest): { token?: string; userUid?: string } {
  return {
    token: getTokenCookie(event),
    userUid: getUserUidCookie(event),
  };
}
