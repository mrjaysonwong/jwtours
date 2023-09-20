import NextAuth, { NextAuthOptions } from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from 'lib/database/connection';
import User from '@model/userModel';
import {
  handleCredentialSignIn,
  handleProviderSignIn,
} from '../handlers/signinApi';

export const authOptions = (NextAuthOptions = {

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        try {
          await connectMongo();

          const user = handleCredentialSignIn(credentials, req);

          return user;
        } catch (error) {
          console.error(error);
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      try {
        await connectMongo();

        handleProviderSignIn(user, account);

        return true;
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },
    // default behavior token undefined after authenticated
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        token.user = user;
      }

      // console.log('jwt', token);

      return token;
    },

    session: async ({ session, token }) => {
      try {
        await connectMongo();

        // check for existing user
        const userExists = await User.findOne({ email: session.user.email });

        // add prop token user to session user object
        session.user = token.user;

        session.user.id = userExists.id;
        session.user.name = token.user.name;
        session.user.role = userExists.role;
        // console.log('session', session);

        return session;
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },
  },

  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default NextAuth(authOptions);
