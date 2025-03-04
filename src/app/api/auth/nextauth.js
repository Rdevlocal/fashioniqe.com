import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Replace with actual authentication logic
                if (credentials.email === "test@example.com" && credentials.password === "password123") {
                    return { id: "1", name: "John Doe", email: credentials.email };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
});
