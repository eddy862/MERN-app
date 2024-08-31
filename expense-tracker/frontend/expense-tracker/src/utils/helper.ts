import { IGoogleUser, ILocalUser } from "../types/user";

export const verifyEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
  return passwordRegex.test(password);
};

export const extractInitials = (name: string) => {
  const names = name.split(" ");
  return (
    names[0].charAt(0) + (names.length > 1 ? names[1].charAt(0) : "")
  ).toUpperCase();
};

export const isLocalUser = (user: unknown): user is ILocalUser => {
  if (user === null || typeof user !== "object") {
    return false;
  }
  return (user as ILocalUser).username !== undefined;
};

export const isGoogleUser = (user: unknown): user is IGoogleUser => {
  if (user === null || typeof user !== "object") {
    return false;
  }
  return (user as IGoogleUser).googleId !== undefined;
};

export const toCurrency = (amount: number) => {
  return amount.toFixed(2);
};
