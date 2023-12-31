import { createContext } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'src/theme/createEmotionCache';
import MuiThemeProvider from '@src/theme/MuiThemeProvider';
import parseCookies from 'utils/parser/parseCookies';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const LayoutContext = createContext();

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

function MyApp(props) {
  const {
    Component,
    themeSetting,
    fontSetting,
    emotionCache = clientSideEmotionCache,
    session,
    pageProps,
  } = props;

  const contextValue = {
    themeSetting,
    fontSetting,
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <CacheProvider value={emotionCache}>
            <LayoutContext.Provider value={contextValue}>
              <MuiThemeProvider>
                <Component {...pageProps} />
              </MuiThemeProvider>
            </LayoutContext.Provider>
          </CacheProvider>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {
  let themeSetting;
  let fontSetting;

  if (ctx.req && ctx.req.headers.cookie) {
    const cookies = parseCookies(ctx);

    themeSetting = cookies.themePreference;
    fontSetting = cookies.fontPreference;
  }

  return {
    themeSetting,
    fontSetting,
  };
};
