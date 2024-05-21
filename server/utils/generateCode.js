import crypto from 'crypto';
export const generateCode = () => {
  return crypto.randomBytes(32).toString('hex');
};
