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
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.isLoggedIn = true;
        token.isOnboarded = user.isOnboarded;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.isLoggedIn = token.isLoggedIn;
      session.user.isOnboarded = token.isOnboarded;
      session.user.id = token.sub;
      return session;
    }
  }
})