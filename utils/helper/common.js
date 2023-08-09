export function getUrl(previousUrl, prevPath) {
  const pathname =
    previousUrl === undefined ? prevPath : new URL(previousUrl).pathname;

  const redirectUrl = pathname === pathname ? previousUrl : '/';

  return redirectUrl;
}
