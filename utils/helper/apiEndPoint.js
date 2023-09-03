export const API_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXTAUTH_URL
    : 'http://localhost:3000';
