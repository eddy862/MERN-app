import bcrypt from "bcrypt";

export const hashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (plain: string, password: string) => {
  return await bcrypt.compare(plain, password);
};
