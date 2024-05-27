import crypto from "crypto";
export const generateCode = (length) => {
  return crypto.randomUUID().toString("hex");
};
