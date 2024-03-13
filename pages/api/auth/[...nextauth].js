import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { credentialsSignIn } from './providers/credentialsSignIn';
import { openAuthSignIn } from './providers/openAuthSignIn';
import { sessionProperties } from './session/sessionProperties';
import connectMongo from 'lib/database/connection';
import User from '@model/userModel';

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
      id: 'credentials',
      name: 'Credentials SignIn',
      async authorize(credentials, req) {
        try {
          const user = await credentialsSignIn(credentials, req);

          if (user) {
            return user;
          }

          return null;
        } catch (error) {
          console.error(error);
          const isReferenceError = error.name === 'ReferenceError';

          throw new Error(
            isReferenceError ? 'Internal Server Error' : error.message
          );
        }
      },
    }),
    CredentialsProvider({
      id: 'email',
      name: 'email',
      async authorize(credentials, req) {
        try {
          const url = `${process.env.NEXTAUTH_URL}/api/auth/users/signin`;

          const options = {
            method: 'POST',
            body: JSON.stringify(credentials, req),
            headers: { 'Content-Type': 'application/json' },
          };

          const res = await fetch(url, options);

          const user = await res.json();

          if (res.ok && user) {
            return user;
          }

          if (!res.ok) {
            throw new Error(`${user.error.message}, ${res.status}`);
          }

          return null;
        } catch (error) {
          console.error(error);

          const isReferenceError = error.name === 'ReferenceError';

          throw new Error(
            isReferenceError ? 'Internal Server Error, 500' : error.message
          );
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, email, profile, credentials }) {
      if (profile) {
        await openAuthSignIn(user, account);
        return true;
      }

      if (user) {
        await connectMongo();

        const userExists = await User.findOne({ 'email.email': user.email });

        if (userExists) {
          return true;
        }
      }
    },
    // user will be undefined after authenticated
    // that is why it should pass in token
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      await sessionProperties(session, token);

      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/notifications/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default NextAuth(authOptions);
