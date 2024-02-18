import bcrypt from "bcrypt";

export const comparePassword = (
  password: string,
  encryptedPassword: string
) => {
  return bcrypt.compare(password, encryptedPassword);
};
