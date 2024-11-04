import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import supabase from "./supabase"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({user}){
      const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email)
      .single();
      
      if (error){
       console.log("there was an error in processing user data")
       return "/login"
      }

      if (!data){

        const {error: insertError} = await supabase.from("users").insert(
          [{email:user.email, name:user.name}]
        );

        if (insertError){
          console.log("Error while adding the user before onboarding")
          return "/login"
        }

        return "/onboard"
      }

      if (!data.isOnboarded){
        return "/onboard"
      }
      return true;
    }, 

    async session({session, user}){
      const { data, error } = await supabase
      .from("users")
      .select("isOnboarded")
      .eq("email", session.user.email)
      .single();
      if (error) {
        console.error("Error fetching isOnboarded status:", error.message);
        session.user.isLoggedIn = false; // Default to false on error
      } else {
        session.user.isLoggedIn = data.isOnboarded;
      }

      return session;
    }
  }
})