// src/utils/token.js

// Decode JWT payload
export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

// Check if token is expired
export function isTokenExpired(token) {
  if (!token) return true; // no token = expired

  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return true;

  const now = Date.now() / 1000; // current time in seconds
  return decoded.exp < now; // true if expired
}
