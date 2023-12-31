import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from 'lib/database/connection';
import User from '@model/userModel';
import { handleCredentialSignIn } from '../handlers/signinAPI/handleCredentialSignIn';
import { handleProviderSignIn } from '../handlers/signinAPI/handleProviderSignIn';

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

          const user = await handleCredentialSignIn(credentials, req);

          return user;
        } catch (error) {
          console.error('Credentials provider error:', error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectMongo();

        await handleProviderSignIn(user, account);

        return true;
      } catch (error) {
        console.error('callback error:', error);
        throw error;
      }
    },
    // default behavior token undefined after authenticated
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      try {
        await connectMongo();

        // check for existing user
        const userExists = await User.findOne({ email: token.user.email });

        if (!userExists) {
          throw new Error('User Not Found.');
        }

        // add prop token user to session user object

        session.user = token.user;
        session.user._id = `${userExists._id}`;
        session.user.name =
          `${userExists.firstName} ${userExists.lastName}` ?? token.user.name;
        session.user.role = userExists.role;
        session.user.accountType = userExists.accountType;

        return session;
      } catch (error) {
        console.error('session error:', error);
        throw error;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default NextAuth(authOptions);
