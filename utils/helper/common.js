export function getUrl(previousUrl) {
  const pathname = new URL(previousUrl).pathname;

  const redirectUrl = pathname === '/auth/signup' ? '/' : previousUrl;

  return redirectUrl;
}
