import bcrypt from "bcrypt";
import { ILocalUser, IGoogleUser } from "../models/user.model";

export const hashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (plain: string, password: string) => {
  return await bcrypt.compare(plain, password);
};

export const isLocalUser = (user: unknown): user is ILocalUser => {
  return (user as ILocalUser).password !== undefined;
}

export const isGoogleUser = (user: unknown): user is IGoogleUser => {
  return (user as IGoogleUser).googleId !== undefined;
}

