import { TOTP } from 'totp-generator';

export function generateOTP() {
  // Get the current time in milliseconds
  const currentTimestamp = new Date().getTime();

  // Calculate the expiration timestamp (5 minutes from now)
  const expireTimestamp = currentTimestamp + 5 * 60 * 1000;

  const { otp, expires } = TOTP.generate(process.env.BASE32, {
    digits: 6,
    algorithm: 'SHA-512',
    period: 60,
    timestamp: expireTimestamp,
  });

  return { otp, expires };
}
