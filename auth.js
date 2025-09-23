import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./models/user";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  // providers: [
  //   Credentials({
  //     credentials: {
  //       email: {},
  //       password: {},
  //     },
  //     authorize: async (credentials) => {
  //       const user = await findUserByCredentials(
  //         credentials.email,
  //         credentials.password,
  //       );

  //       return user;
  //     },
  //   }),
  // ],

  pages: {
    signIn: "/login",
  },
  events: {
    async linkAccount({ user }) {},
  },
  callbacks: {
    // async jwt({ token, user, trigger, session }) {
    //   if (trigger === "update") {
    //     return { ...token, ...session.user };
    //   }

    //   return { ...token, ...user };
    // },
    // async session({ session, token }) {
    //   session.user = token;
    //   return session;
    // },
    async session({ session, token, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      // TÁ PORCO
      session.user.phone = token.phone;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.phone = existingUser.phone;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
