import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin", email: credentials?.email, role: "admin" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/admin/login",  // Custom login page
  },
  session: { strategy: "jwt",
    maxAge: 1 * 60 * 60
   },
})

export { handler as GET, handler as POST }