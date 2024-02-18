import bcrypt from "bcrypt";

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};
