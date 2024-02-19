import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  encryptedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, encryptedPassword);
};
