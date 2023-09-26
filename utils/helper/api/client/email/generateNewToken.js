import jwt from 'jsonwebtoken';

export function generateNewToken(userId) {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1m',
  });
}
