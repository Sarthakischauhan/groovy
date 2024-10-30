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
          [{email:user.email, mame:user.name}]
        );

        if (insertError){
          console.log("Error while adding the user before onboarding")
          return "/login"
        }

        return "/onboard"
      }
      console.log("Everything works fine")
      return "/onboard";
    }
  }
})