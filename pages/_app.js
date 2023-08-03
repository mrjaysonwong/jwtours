import { createContext } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@emotion/react';
import { getSession } from 'next-auth/react';
import createEmotionCache from 'src/theme/createEmotionCache';
import MuiThemeProvider from '@src/theme/MuiThemeProvider';
import parseCookies from 'utils/parser/parseCookies';
import '../styles/globals.css';

export const LayoutContext = createContext();

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const {
    Component,
    themeSetting,
    fontSetting,
    emotionCache = clientSideEmotionCache,
session,
pageProps
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

      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <LayoutContext.Provider value={contextValue}>
            <MuiThemeProvider>
              <Component {...pageProps} />
            </MuiThemeProvider>
          </LayoutContext.Provider>
        </CacheProvider>
      </SessionProvider>
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
