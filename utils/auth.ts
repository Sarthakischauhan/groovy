import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import supabase from "./supabase"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({user}){
      const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email)
      .single();
      
      if (error){
        console.log("there was an error in processing user data")
        return false;
      }

      if (!data){
        const {error: insertError} = await supabase.from("users").insert(
          [{email:user.email, name:user.name, isOnboarded: false}]
        );

        if (insertError){
          console.log("Error while adding the user before onboarding")
          return false;
        }
        user.isOnboarded = false;
        return true 
      }
      user.isOnboarded = data?.isOnboarded
      user.id = data?.id
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        console.log("jwt user",user)
        token.isLoggedIn = true;
        token.isOnboarded = user.isOnboarded;
        token.id = user.id;
      }

      // Handle updates to the token when session is updated
      if (trigger === "update" && session) {
        token.isOnboarded = session.isOnboarded;
      }

      return token;
    },

    async session({ session, token, trigger, newSession }) {
      if (trigger === "update" && newSession) {
        // Update token with new session data
        token.isOnboarded = newSession.isOnboarded;
        console.log("this was run on trigger")
      }
      if (session?.user) {
        session.user.isLoggedIn = token.isLoggedIn as boolean | undefined;
        session.user.isOnboarded = token.isOnboarded as boolean | undefined;
        session.user.id = token.id as string;
      }
      return session;
    }
  }
})