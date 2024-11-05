import NextAuth, {DefaultSession} from "next-auth";

declare module 'next-auth' {
    interface User { 
        isOnboarded ?: boolean;
        isLoggedIn ?: boolean;
    }

    interface Session {
        user: User &
        DefaultSession["user"]
    }
}