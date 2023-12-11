import jwt from 'jsonwebtoken';

export function generateNewToken(email) {
  return jwt.sign({email}, process.env.JWT_SECRET, {
    expiresIn: '2m',
  });
}
